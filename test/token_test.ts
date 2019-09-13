import { BigNumber, ContractWrappers } from "0x.js";
import { DummyERC20TokenContract } from "@0x/abi-gen-wrappers";
import assert, { doesNotReject } from "assert";
import { Server } from "http";
import Web3 from "web3";

import { ERC20Token } from "../src";

const {
    WEB3_URL = "http://localhost:8545",

    // defaults are 0x snapshot dummy ERC-20 tokens (format "TICKER:ADDRESS")
    DUMMY_TOKEN_A = "TKA:0x34d402f14d58e001d8efbe6585051bf9706aa064",
    DUMMY_TOKEN_B = "TKB:0x25b8fe1de9daf8ba351890744ff28cf7dfa8f5e3",

    TEST_ACCOUNT_INDEX = "6",
    MINT_AMOUNT_A = "100",
    MINT_AMOUNT_B = "200",
} = process.env;

describe("ERC20Token helper class tests", function (): void {
    this.timeout("2m");

    const ZERO = new BigNumber(0);

    // unlimited ERC-20 allowance (2**256 - 1)
    const MAX_ALLOWANCE = new BigNumber(2).exponentiatedBy(256).minus(1);

    const mintAmountA = new BigNumber(Web3.utils.toWei(MINT_AMOUNT_A));
    const mintAmountB = new BigNumber(Web3.utils.toWei(MINT_AMOUNT_B));

    let web3: Web3;
    let erc20: ERC20Token;

    let address: string;

    let contractWrappers: ContractWrappers;
    let erc20ProxyAddress: string;
    let networkId: number;
    let accounts: string[];

    let tokenAAddress: string;
    let tokenBAddress: string;
    let tokenA: DummyERC20TokenContract;
    let tokenB: DummyERC20TokenContract;

    this.beforeAll("setup web3, 0x contract wrappers, and test accounts", async function (): Promise<void> {
        web3 = new Web3(WEB3_URL);

        networkId = await web3.eth.net.getId();
        accounts = await web3.eth.getAccounts();

        contractWrappers = new ContractWrappers(web3.currentProvider, { networkId });
        erc20ProxyAddress = contractWrappers.erc20Proxy.address;

        address = accounts[parseInt(TEST_ACCOUNT_INDEX)];

        erc20 = new ERC20Token(web3.currentProvider);
    });

    this.beforeAll("setup dummy tokens", async function (): Promise<void> {
        tokenAAddress = DUMMY_TOKEN_A.split(":")[1];
        tokenBAddress = DUMMY_TOKEN_B.split(":")[1];

        tokenA = new DummyERC20TokenContract(tokenAAddress, web3.currentProvider);
        tokenB = new DummyERC20TokenContract(tokenBAddress, web3.currentProvider);

    });

    it("should have the correct erc20 proxy address", async function (): Promise<void> {
        const loadedAddress = await erc20.getProxyAddressAsync();
        assert.strictEqual(loadedAddress, erc20ProxyAddress, "asset proxy addresses should match");
    });

    it("should have the correct network ID", async function (): Promise<void> {
        const loadedId = await erc20.getNetworkIdAsync();
        assert.strictEqual(loadedId, networkId, "network ID's should match");
    });

    it("should correctly fetch balances before mint", async function (): Promise<void> {
        const balanceA = await erc20.getBalanceAsync(tokenAAddress, address);
        const balanceB = await erc20.getBalanceAsync(tokenBAddress, address);

        assert.strictEqual(balanceA.toString(), ZERO.toString(), "balance should be 0 before mint");
        assert.strictEqual(balanceB.toString(), ZERO.toString(), "balance should be 0 before mint");

        // mint tokens for next assertions
        await tokenA.mint.sendTransactionAsync(mintAmountA, { from: address });
        await tokenB.mint.sendTransactionAsync(mintAmountB, { from: address });
    });

    it("should correctly fetch balances after mint", async function (): Promise<void> {
        const balanceA = await erc20.getBalanceAsync(tokenAAddress, address);
        const balanceB = await erc20.getBalanceAsync(tokenBAddress, address);

        assert.strictEqual(balanceA.toString(), mintAmountA.toString(), "balance A should match expected mint amount");
        assert.strictEqual(balanceB.toString(), mintAmountB.toString(), "balance B should match expected mint amount");
    });

    it("should correctly show no allowances before being set", async function (): Promise<void> {
        const allowanceA = await erc20.getProxyAllowanceAsync(tokenAAddress, address);
        const allowanceB = await erc20.getProxyAllowanceAsync(tokenBAddress, address);

        assert.strictEqual(allowanceA.toString(), ZERO.toString(), "should have no proxy allowance for token A");
        assert.strictEqual(allowanceB.toString(), ZERO.toString(), "should have no proxy allowance for token B");
    });

    it("should set unlimited ERC-20 proxy allowances without error", async function (): Promise<void> {
        const txIdA = await erc20.setUnlimitedProxyAllowanceAsync(tokenAAddress, { from: address });
        const txIdB = await erc20.setUnlimitedProxyAllowanceAsync(tokenBAddress, { from: address });

        assert(/^0x[a-fA-F0-9]{64}$/.test(txIdA), "txIdA should be a valid transaction hash");
        assert(/^0x[a-fA-F0-9]{64}$/.test(txIdB), "txIdB should be a valid transaction hash");
    });

    it("should correctly show unlimited allowances after being set", async function (): Promise<void> {
        const allowanceA = await erc20.getProxyAllowanceAsync(tokenAAddress, address);
        const allowanceB = await erc20.getProxyAllowanceAsync(tokenBAddress, address);

        assert.strictEqual(allowanceA.toString(), MAX_ALLOWANCE.toString(), "should have max proxy allowance for token A");
        assert.strictEqual(allowanceB.toString(), MAX_ALLOWANCE.toString(), "should have max proxy allowance for token B");
    });
});
