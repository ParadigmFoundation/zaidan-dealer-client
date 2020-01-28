import { assert } from "@0x/assert";
import { assetDataUtils, signatureUtils, SignedOrder } from "@0x/order-utils";
import { addressUtils, BigNumber, providerUtils } from "@0x/utils";
import { HttpProvider } from "@0x/web3-providers-fork";
import { Web3Wrapper } from "@0x/web3-wrapper";
import { ERC20Token } from "@habsyr/erc20-token";
import { SupportedProvider } from "ethereum-types";

import { Quote } from "./types";
import { parseQuoteJSON } from "./utils";

/**
 * A simple client for a Zaidan Dealer JSONRPC server that provides functionality to sign and submit fill requests.
 *
 * Be sure to be familiar with the [Dealer JSONRPC specification](https://github.com/ParadigmFoundation/zaidan-dealer-specification)
 * for important usage information.
 */
export class DealerClient {
    /** 2^256 - 1 represents an effectively "unlimited" allowance */
    public static MAX_ALLOWANCE = new BigNumber(2).exponentiatedBy(256).minus(1);

    private readonly jsonrpcProvider: HttpProvider;
    private readonly ethereumProvider: SupportedProvider;
    private readonly web3: Web3Wrapper;
    private readonly erc20: ERC20Token;

    /**
     * Create a new dealer client instance with a given Ethereum provider and the URL for a dealer server.
     *
     * @param provider a supported Ethereum provider/engine
     * @param baseUrl the HTTP URL of a dealer JSONRPC server
     */
    constructor(provider: SupportedProvider, baseUrl: string) {
        providerUtils.standardizeOrThrow(provider);

        this.jsonrpcProvider = new HttpProvider(baseUrl);
        this.ethereumProvider = provider;
        this.web3 = new Web3Wrapper(provider);
        this.erc20 = new ERC20Token(this.web3.getProvider());
    }

    /**
     * Fetch a price quote from a dealer server for a given maker asset, taker asset, and one of either the maker size
     * or the taker size.
     *
     * Whichever value (`makerSize` or `takerSize`) is not included will be filled-in by the dealer to provide the quote's
     * price.
     *
     * Even though the `takerAddress` field is optional in this method, individual dealer servers MAY require that takers
     * include their address in the initial quote request. If it is not included, the dealer server will return an error.
     *
     * @param makerAsset the address of the ERC-20 asset provided by the dealer in the trade (received by client)
     * @param takerAsset the address of the ERC-20 asset provided by the client in the trade (received by dealer)
     * @param makerSize the size of the trade in units of the maker asset (either this or `takerSize` must be `null`)
     * @param takerSize the size of the trade in units of the taker asset (either this or `makerSize` must be `null`)
     * @param takerAddress the address of the trader who will sign and fill the quote (MAY be required by dealer)
     */
    public async getQuote(
        makerAsset: string,
        takerAsset: string,
        makerSize?: BigNumber.Value,
        takerSize?: BigNumber.Value,
        takerAddress: string = null,
    ): Promise<any> {
        if (!makerSize && !takerSize) {
            throw new Error("must specify either 'makerSize' or 'takerSize'");
        }

        if (!addressUtils.isAddress(makerAsset) || !addressUtils.isAddress(takerAsset)) {
            throw new Error("both 'makerAsset' and 'takerAsset' must be valid Ethereum addresses");
        }

        const mSize = makerSize ? new BigNumber(makerSize) : null;
        const tSize = takerSize ? new BigNumber(takerSize) : null;

        let rawQuote;
        try {
            [rawQuote] = await this.call("getQuote", makerAsset, takerAsset, mSize, tSize, takerAddress);
        } catch (error) {
            throw new Error(`failed to get quote: ${error.message}`);
        }

        return parseQuoteJSON(rawQuote);
    }

    /**
     * Sign and submit a request-for-fill to a dealer.
     *
     * Requires that the `takerAddress` included in the original quote request be available to sign the 0x transaction.
     *
     * @param quote a quote previously fetched from a dealer
     * @param validate if true, will validate the fill before submitting to dealer for execution
     */
    public async submitFill(quote: Quote, validate: boolean = false): Promise<string> {
        const addresses = await this.getAvailableAddresses();
        const { quoteId, zeroExTransactionInfo } = quote;
        const { transaction, order } = zeroExTransactionInfo;
        const { signerAddress } = transaction;

        if (!addresses.includes(signerAddress)) {
            throw new Error(`cannot sign with required taker address: ${signerAddress}`);
        }

        if (validate) {
            try {
                await this._validateFill(order, signerAddress);
            } catch (error) {
                throw new Error(`fill validation failed (unable to execute): ${error.message}`);
            }
        }

        const signedTransaction = await signatureUtils.ecSignTransactionAsync(this.ethereumProvider, transaction, signerAddress);
        const { salt, signature, data, gasPrice, expirationTimeSeconds } = signedTransaction;

        let submitFillRes;
        try {
            submitFillRes = await this.call("submitFill", quoteId, salt, signature, signerAddress, data, gasPrice, expirationTimeSeconds.toNumber());
        } catch (error) {
            throw new Error(`failed to submit fill: ${error.message}`);
        }

        return submitFillRes[1];
    }

    /**
     * Return an array of all available addresses.
     *
     * @returns all addresses the user may sign with
     */
    public async getAvailableAddresses(): Promise<string[]> {
        return this.web3.getAvailableAddressesAsync();
    }

    /**
     * Fetch the user's "coinbase" (0-indexed) address.
     *
     * Throws is no addresses are available.
     *
     * @returns the coinbase address
     */
    public async getCoinbase(): Promise<string> {
        const addresses = await this.getAvailableAddresses();
        if (addresses.length < 1) {
            throw new Error("no available addresses for current provider");
        }

        return addresses[0];
    }

    private async _validateFill(order: SignedOrder, takerAddress: string): Promise<void> {
        // 1. check that takerAddress is equal to order.takerAddress (or that order.takerAddress is null)
        assert.assert(order.takerAddress.toLowerCase() === takerAddress.toLowerCase(), "taker address must match order");

        // 2. Ensure order is not expired
        const expiration = new Date(order.expirationTimeSeconds.toNumber() * 1000);
        assert.assert(new Date() < expiration, "order must expire in the future");

        const { tokenAddress: makerAsset } = assetDataUtils.decodeERC20AssetData(order.makerAssetData);
        const { tokenAddress: takerAsset } = assetDataUtils.decodeERC20AssetData(order.takerAssetData);

        // 3. ensure that taker has sufficient ERC-20 allowances for taker asset
        const takerAllowance = await this.erc20.getProxyAllowanceAsync(takerAsset, takerAddress);
        assert.assert(takerAllowance.gte(order.takerAssetAmount), "taker must have allowance >= taker asset amount");

        // 4. ensure that taker has sufficient ERC-20 balance for taker asset
        const takerBalance = await this.erc20.getBalanceAsync(takerAsset, takerAddress);
        assert.assert(takerBalance.gte(order.takerAssetAmount), "taker must have balance >= taker asset amount");

        // 5. ensure that maker has sufficient ERC-20 allowances for maker asset
        const makerAllowance = await this.erc20.getProxyAllowanceAsync(makerAsset, order.makerAddress);
        assert.assert(makerAllowance.gte(order.makerAssetAmount), "maker must have allowance >= taker asset amount");

        // 6. ensure that taker has sufficient ERC-20 balance for taker asset
        const makerBalance = await this.erc20.getBalanceAsync(makerAsset, order.makerAddress);
        assert.assert(makerBalance.gte(order.makerAssetAmount), "maker must have balance >= taker asset amount");
    }

    private async call(method: string, ...args: any[]): Promise<any[]> {
        const resp = await this.jsonrpcProvider.send(`dealer_${method}`, args);
        return resp;
    }
}
