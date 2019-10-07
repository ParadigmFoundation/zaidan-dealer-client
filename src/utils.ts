import { ExchangeContract } from "@0x/abi-gen-wrappers";
import { assert } from "@0x/assert";
import { schemas } from "@0x/json-schemas";
import { generatePseudoRandomSalt, signatureUtils, transactionHashUtils } from "@0x/order-utils";
import { SignedOrder, SignedZeroExTransaction, ZeroExTransaction } from "@0x/types";
import { BigNumber, providerUtils } from "@0x/utils";
import axios from "axios";
import { SupportedProvider } from "ethereum-types";

import { DealerFillTransaction, GasPriority } from "./types";

/**
 * Given a signed 0x order, signer address, and taker asset amount, prepare and
 * sign a 0x fill transaction to be submitted to the verifying exchange contract
 * for the desired network.
 *
 * Can be used with regular (taker-submitted) fills, as well as ZEIP-18 (sender-
 * submitted) fills.
 *
 * @param provider A supported provider (`signerAddress` must be available).
 * @param signerAddress The address to sign the fill transaction with.
 * @param verifyingContractAddress Usually the 0x exchange contract address for a given network.
 * @param order A maker-signed 0x order message to create a fill transaction for.
 * @param takerAmount The amount of the available `takerAssetAmount` to fill (base units).
 * @returns The signed 0x transaction data.
 */
export async function createAndSignZeroExTransaction(
    provider: SupportedProvider,
    signerAddress: string,
    verifyingContractAddress: string,
    order: SignedOrder,
    takerAmount: BigNumber,
): Promise<SignedZeroExTransaction> {
    const zrxProvider = providerUtils.standardizeOrThrow(provider);
    assert.isETHAddressHex("signerAddress", signerAddress);
    assert.isETHAddressHex("verifyingContractAddress", verifyingContractAddress);
    assert.doesConformToSchema("order", order, schemas.signedOrderSchema);
    assert.isBigNumber("takerAmount", takerAmount);

    const salt = generatePseudoRandomSalt();
    const exchange = new ExchangeContract(verifyingContractAddress, zrxProvider);
    const data = exchange.fillOrder.getABIEncodedTransactionData(order, takerAmount, order.signature);
    const fillTx: ZeroExTransaction = { verifyingContractAddress, salt, signerAddress, data };
    return signatureUtils.ecSignTransactionAsync(zrxProvider, fillTx, signerAddress);
}

/**
 * Create a dealer POST /order request body from a signed 0x fill transaction and
 * the quote ID corresponding to the signed transaction data.
 *
 * @param fillTx The taker-signed ZEIP-18 fill transaction.
 * @param quoteId The quote UUID corresponding to the initial quote request.
 * @returns The necessary request body to submit the fill to the dealer.
 */
export function convertZeroExTransactionToDealerFill(fillTx: SignedZeroExTransaction, quoteId: string): DealerFillTransaction {
    const { salt: saltBn, data, signature: sig, signerAddress: address } = fillTx;
    const salt = saltBn.toString();
    const hash = transactionHashUtils.getTransactionHashHex(fillTx);
    return { salt, data, hash, address, sig, quoteId };
}

/**
 * Fetch a gas price from Etherchain.org for a given priority (tx conf speed).
 *
 * @param priority Get gas price for provided priority (see [GasPricePriority]).
 */
export async function getGasPrice(priority: GasPriority): Promise<BigNumber> {
    const gasPriceApi = "https://www.etherchain.org/api/gasPriceOracle";
    let gasPriceGwei: string;
    try {
        const prices = await axios(gasPriceApi);
        gasPriceGwei = prices.data[priority];
    } catch {
        gasPriceGwei = "12";
    }
    return new BigNumber(gasPriceGwei).times("1e9");
}
