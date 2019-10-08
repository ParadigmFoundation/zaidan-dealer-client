import { DummyERC20TokenContract } from "@0x/abi-gen-wrappers";
import { ContractWrappers } from "@0x/contract-wrappers";
import { BigNumber } from "@0x/utils";
import assert from "assert";
import { Server } from "http";
import Redis from "ioredis";
import Web3 from "web3";

import { DealerClient } from "../src/DealerClient";

// start mocking server
import { app } from "./helpers/mockDealer";

const {
    WEB3_URL = "http://localhost:8545",

    // ensure the port value matches the URL if overriding
    DEALER_PORT = "8080",
    DEALER_URL = "http://localhost:8080",

    // defaults are 0x snapshot dummy ERC-20 tokens (format "TICKER:ADDRESS")
    DUMMY_TOKEN_A = "TKA:0x34d402f14d58e001d8efbe6585051bf9706aa064",
    DUMMY_TOKEN_B = "TKB:0x25b8fe1de9daf8ba351890744ff28cf7dfa8f5e3",

    DEALER_ACCOUNT_INDEX = "4",
    CLIENT_ACCOUNT_INDEX = "5",

    // configures number of tokens to mint of both token A and B for client/dealer
    MINT_AMOUNT = "1000",
} = process.env;

describe("Zaidan client unit tests", function (): void {
    this.timeout("2m");

    // unlimited ERC-20 allowance (2**256 - 1)
    const MAX_ALLOWANCE = new BigNumber(2).exponentiatedBy(256).minus(1);

    // mint amount used for dummy tokens
    const mintAmount = new BigNumber(Web3.utils.toWei(MINT_AMOUNT));

    // zaidan dealer client instance
    let client: DealerClient;

    let web3: Web3;

    let contractWrappers: ContractWrappers;
    let erc20ProxyAddress: string;
    let networkId: number;
    let accounts: string[];

    // mock dealer and client account addresses
    let clientAddress: string;
    let dealerAddress: string;

    let tokenATicker: string;
    let tokenBTicker: string;
    let tokenAAddress: string;
    let tokenBAddress: string;
    let tokenA: DummyERC20TokenContract;
    let tokenB: DummyERC20TokenContract;

    // mock dealer server instance
    let server: Server;

    this.beforeAll("start mock dealer server", function (): void {
        server = app.listen(parseInt(DEALER_PORT));
    });

    this.afterAll("stopping mock server", function (): void {
        server.close();
    });

    this.beforeAll("setup web3, 0x contract wrappers, and test accounts", async function (): Promise<void> {
        web3 = new Web3(WEB3_URL);

        networkId = await web3.eth.net.getId();
        accounts = await web3.eth.getAccounts();

        contractWrappers = new ContractWrappers(web3.currentProvider, { networkId });
        erc20ProxyAddress = contractWrappers.erc20Proxy.address;

        clientAddress = accounts[parseInt(CLIENT_ACCOUNT_INDEX)];
        dealerAddress = accounts[parseInt(DEALER_ACCOUNT_INDEX)];

        client = new DealerClient(DEALER_URL, { providerUrl: WEB3_URL, takerAddress: clientAddress });
        await client.init();
    });

    this.beforeAll("setup dummy tokens and server allowances", async function (): Promise<void> {
        ([tokenATicker, tokenAAddress] = DUMMY_TOKEN_A.split(":"));
        ([tokenBTicker, tokenBAddress] = DUMMY_TOKEN_B.split(":"));

        tokenA = new DummyERC20TokenContract(tokenAAddress, web3.currentProvider);
        tokenB = new DummyERC20TokenContract(tokenBAddress, web3.currentProvider);

        await tokenA.approve.awaitTransactionSuccessAsync(erc20ProxyAddress, MAX_ALLOWANCE, { from: dealerAddress });
        await tokenA.approve.awaitTransactionSuccessAsync(erc20ProxyAddress, MAX_ALLOWANCE, { from: dealerAddress });
    });

    this.beforeAll("mint same number of each token for dealer and client", async function (): Promise<void> {
        await tokenA.mint.sendTransactionAsync(mintAmount, { from: dealerAddress });
        await tokenB.mint.sendTransactionAsync(mintAmount, { from: dealerAddress });

        await tokenA.mint.sendTransactionAsync(mintAmount, { from: clientAddress });
        await tokenB.mint.sendTransactionAsync(mintAmount, { from: clientAddress });
    });

    it("should show assets that match expected addresses", function (done: MochaDone): void {
        const assets = client.tokens;
        assert(assets[tokenATicker] === tokenAAddress, "token A address does not match");
        assert(assets[tokenBTicker] === tokenBAddress, "token B address does not match");
        done();
    });

    it("should show markets that match expected symbol", function (done: MochaDone): void {
        const markets = client.pairs;
        assert(markets.length === 1, "should be exactly one market");
        assert(markets[0] === `${tokenATicker}/${tokenBTicker}`, "market should match token tickers");
        done();
    });

    it("should have client coinbase match overridden address", function (done: MochaDone): void {
        assert(client.coinbase === clientAddress, "client coinbase doesn't match");
        done();
    });

    it("should fetch correct balances for tokenA and tokenB", async function (): Promise<void> {
        const balanceA = await client.getBalance(tokenATicker);
        const balanceB = await client.getBalance(tokenBTicker);

        assert.strictEqual(balanceA.toString(), mintAmount.toString(), "balance A should match mint amount");
        assert.strictEqual(balanceB.toString(), mintAmount.toString(), "balance B should match mint amount");
    });

    it("should show that proxy allowances are not set", async function (): Promise<void> {
        const hasTokenA = await client.hasAllowance(tokenATicker);
        const hasTokenB = await client.hasAllowance(tokenBTicker);

        assert(!hasTokenA, "should not have token A allowance yet");
        assert(!hasTokenB, "should not have token B allowance yet");
    });

    it("should set 0x ERC-20 proxy allowances without error", async function (): Promise<void> {
        const receiptA = await client.setAllowance(tokenATicker);
        const receiptB = await client.setAllowance(tokenBTicker);

        assert(/^0x[a-fA-F0-9]{64}$/.test(receiptA.transactionHash), "invalid transaction ID for allowance A transaction");
        assert(/^0x[a-fA-F0-9]{64}$/.test(receiptB.transactionHash), "invalid transaction ID for allowance B transaction");
    });

    it("should show that proxy allowances are set for token A and token B", async function (): Promise<void> {
        const hasTokenA = await client.hasAllowance(tokenATicker);
        const hasTokenB = await client.hasAllowance(tokenBTicker);

        assert(hasTokenA, "should have token A allowance set");
        assert(hasTokenB, "should have token B allowance set");
    });

    it("should fetch a quote without error", async function (): Promise<void> {
        const market = client.pairs[0];
        const quote = await client.getQuote(1, market, "bid");

        assert(quote.size === 1, "quote size should be 1");
        assert(quote.order, "quote should contain an order");
        assert(quote.expiration > (Date.now() / 1000), "quote expiration should be in the future");
    });

    it("should fill a quote without error", async function (): Promise<void> {
        const market = client.pairs[0];
        const { id, order } = await client.getQuote(1, market, "bid");
        const txId = await client.handleTrade(order, id);

        assert(txId, "there should be a transaction ID");
        assert(/^0x[a-fA-F0-9]{64}$/.test(txId), "the transaction ID should be a valid transaction hash");
    });
});
