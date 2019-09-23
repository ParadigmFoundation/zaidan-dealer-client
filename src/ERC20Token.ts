import { BigNumber, ERC20TokenContract, SupportedProvider, TxData } from "0x.js";
import { ContractAddresses, getContractAddressesForNetworkOrThrow } from "@0x/contract-addresses";
import { Web3Wrapper } from "@0x/web3-wrapper";
import assert from "assert";

/**
 * Convenience class for interacting with multiple ERC-20 tokens through a single
 * class, without needing to instantiate new contract instances for each token
 * address used.
 *
 * Instances of the `ERC20Token` class provide methods for checking balances,
 * allowances, and proxy allowances for the 0x ERC-20 asset proxy contract. It
 * also provides methods for setting arbitrary or unlimited ERC-20 proxy allowances
 * without needing to manually specify the asset proxy address.
 */
export class ERC20Token {
    public static UNLIMITED_ALLOWANCE = new BigNumber(2).exponentiatedBy(256).minus(1);

    private readonly _initializing: Promise<void>;
    private readonly _tokenContracts: { [address: string]: ERC20TokenContract };
    private readonly _provider: SupportedProvider;
    private readonly _web3: Web3Wrapper;

    private _networkId: number;
    private _zrxAddresses: ContractAddresses;
    private _erc20ProxyAddress: string;

    /**
     * Create a new `ERC20Token` instance with a Web3 provider to access convenience
     * methods for interacting with arbitrary ERC-20 tokens and the 0x ERC-20 asset
     * proxy contract.
     *
     * @param provider A supported Web3 JSONRPC provider
     */
    constructor(provider: SupportedProvider) {
        this._tokenContracts = {};
        this._provider = provider;
        this._web3 = new Web3Wrapper(this._provider);

        // resolves after loading network ID and contract addresses
        this._initializing = this.initialize();
    }

    /**
     * Fetch user's ERC-20 token balance in base units (wei).
     *
     * @param tokenAddress The ERC-20 token contract address.
     * @param userAddress User's address to fetch balance for.
     * @returns A promise that resolves to the users balance of the provided token in base units (wei).
     */
    public async getBalanceAsync(tokenAddress: string, userAddress: string): Promise<BigNumber> {
        const token = this.getTokenContract(tokenAddress);
        const user = this.normalizeAddress(userAddress);
        return token.balanceOf.callAsync(user);
    }

    /**
     * Fetch user's ERC-20 allowance for a specific spender in base units (wei).
     *
     * @param tokenAddress The ERC-20 token contract address.
     * @param userAddress User's address to fetch allowance for.
     * @param spenderAddress The spender address to fetch allowance for.
     * @returns A promise that resolves to the spender's allowance for the user's tokens in base units (wei).
     */
    public async getAllowanceAsync(tokenAddress: string, userAddress: string, spenderAddress: string): Promise<BigNumber> {
        const user = this.normalizeAddress(userAddress);
        const spender = this.normalizeAddress(spenderAddress);
        const token = this.getTokenContract(tokenAddress);
        return token.allowance.callAsync(user, spender);
    }

    /**
     * Fetch user's 0x ERC-20 proxy allowance for a given token in base units (wei).
     *
     * @param tokenAddress The ERC-20 token contract address.
     * @param userAddress User's address to fetch 0x ERC-20 proxy allowance for.
     * @returns A promise that resolves to the users 0x ERC20 proxy allowance for the given token in base units (wei).
     */
    public async getProxyAllowanceAsync(tokenAddress: string, userAddress: string): Promise<BigNumber> {
        const proxyAddress = await this.getProxyAddressAsync();
        return this.getAllowanceAsync(tokenAddress, userAddress, proxyAddress);
    }

    /**
     * Set user's 0x ERC-20 allowance for a given address in base units (wei).
     *
     * @param tokenAddress The ERC-20 token contract address.
     * @param spenderAddress The address of the desired spender to set allowance for.
     * @param allowance The desired allowance (in wei) to set for the ERC-20 proxy.
     * @param txOptions Optional transaction options (gas price, etc).
     * @returns A promise that resolves to the resulting transaction hash (TX ID).
     */
    public async setAllowanceAsync(
        tokenAddress: string,
        spenderAddress: string,
        allowance: BigNumber,
        txOptions: Partial<TxData> = {},
    ): Promise<string> {
        const token = this.getTokenContract(tokenAddress);
        const spender = this.normalizeAddress(spenderAddress);
        return token.approve.validateAndSendTransactionAsync(spender, allowance, txOptions);
    }

    /**
     * Set user's 0x ERC-20 proxy allowance for a given token in base units (wei).
     *
     * @param tokenAddress The ERC-20 token contract address.
     * @param allowance The desired allowance (in wei) to set for the ERC-20 proxy.
     * @param txOptions Optional transaction options (gas price, etc).
     * @returns A promise that resolves to the resulting transaction hash (TX ID).
     */
    public async setProxyAllowanceAsync(
        tokenAddress: string,
        allowance: BigNumber,
        txOptions: Partial<TxData> = {},
    ): Promise<string> {
        const proxyAddress = await this.getProxyAddressAsync();
        return this.setAllowanceAsync(
            tokenAddress,
            proxyAddress,
            allowance,
            txOptions,
        );
    }

    /**
     * Set an unlimited allowance for the 0x ERC-20 proxy allowance for a given
     * token and user address.
     *
     * @param tokenAddress The ERC-20 token contract address.
     * @param txOptions Optional transaction options (gas price, etc).
     * @returns A promise that resolves to the resulting transaction hash (TX ID).
     */
    public async setUnlimitedProxyAllowanceAsync(
        tokenAddress: string,
        txOptions: Partial<TxData> = {},
    ): Promise<string> {
        return this.setProxyAllowanceAsync(
            tokenAddress,
            ERC20Token.UNLIMITED_ALLOWANCE,
            txOptions,
        );
    }

    /**
     * Call the `transferFrom` method on an ERC20 token contract (allowance must
     * be set for the spender).
     *
     * @param tokenAddress The ERC-20 token contract address.
     * @param toAddress The address to transfer assets to (receiver).
     * @param fromAddress The spender address (must be approved).
     * @param amount The amount to transfer in base units (wei).
     * @param txOptions Optional transaction options (gas price, etc).
     * @returns A promise that resolves to the resulting transaction hash (TX ID).
     */
    public async transferFromAsync(
        tokenAddress: string,
        toAddress: string,
        fromAddress: string,
        amount: BigNumber,
        txOptions: Partial<TxData> = {},
    ): Promise<string> {
        const token = await this.getTokenContract(tokenAddress);
        const to = this.normalizeAddress(toAddress);
        const from = this.normalizeAddress(fromAddress);
        return token.transferFrom.validateAndSendTransactionAsync(
            from,
            to,
            amount,
            txOptions,
        );
    }

    /**
     * Call the `transfer` method on an ERC20 token contract to transfer some
     * amount of tokens.
     *
     * @param tokenAddress The ERC-20 token contract address.
     * @param toAddress The address to transfer assets to (receiver).
     * @param amount The amount to transfer in base units (wei).
     * @param txOptions Optional transaction options (gas price, etc).
     * @returns A promise that resolves to the resulting transaction hash (TX ID).
     */
    public async transferAsync(
        tokenAddress: string,
        toAddress: string,
        amount: BigNumber,
        txOptions: Partial<TxData> = {},
    ): Promise<string> {
        const token = await this.getTokenContract(tokenAddress);
        const to = this.normalizeAddress(toAddress);
        return token.transfer.validateAndSendTransactionAsync(
            to,
            amount,
            txOptions,
        );
    }

    /**
     * Fetch the current detected networkId.
     */
    public async getNetworkIdAsync(): Promise<number> {
        await this._initializing;
        return this._networkId;
    }

    /**
     * Fetch the 0x ERC-20 asset proxy address for the current network.
     */
    public async getProxyAddressAsync(): Promise<string> {
        await this._initializing;
        return this._erc20ProxyAddress;
    }

    /**
     * Load network ID from provider and configured Ox contract addresses.
     */
    private async initialize(): Promise<void> {
        this._networkId = await this._web3.getNetworkIdAsync();
        this._zrxAddresses = getContractAddressesForNetworkOrThrow(this._networkId);
        this._erc20ProxyAddress = this._zrxAddresses.erc20Proxy;
    }

    /**
     * Return an initialized contract wrapper instance from cache or create a
     * new one if not yet stored for the given address.
     *
     * @param _address Token address to get contract instance for.
     */
    private getTokenContract(_address: string): ERC20TokenContract {
        const address = this.normalizeAddress(_address);
        let contract = this._tokenContracts[address];

        if (contract) {
            assert.strictEqual(address, contract.address, "ERC20Token: address mismatch");
            return contract;
        }
        contract = new ERC20TokenContract(address, this._provider);
        this._tokenContracts[address] = contract;
        return contract;
    }

    /**
     * Validate address (checksummed or not) and return un-checksummed lowercase.
     *
     * @param address A 20-byteaddress.
     */
    private normalizeAddress(address: string): string {
        assert(/^0x[a-fA-F0-9]{40}$/.test(address), "ERC20Token: invalid Ethereum address");
        return address.toString();
    }
}
