import { ContractWrappers } from "@0x/contract-wrappers";
import { assetDataUtils, generatePseudoRandomSalt, signatureUtils } from "@0x/order-utils";
import { BigNumber } from "@0x/utils";
import { Web3Wrapper } from "@0x/web3-wrapper";
import bodyParser from "body-parser";
import express from "express";
import uuid from "uuid/v4";
import Web3 from "web3";

import { DealerResponse } from "../../src/types";

const {
    WEB3_URL = "http://localhost:8545",

    // default is 0x ganache snapshot account index 4
    DEALER_ADDRESS = "0x78dc5d2d739606d31509c31d654056a45185ecb6",

    // defaults are 0x snapshot dummy ERC-20 tokens
    DUMMY_TOKEN_A_ADDRESS = "0x34d402f14d58e001d8efbe6585051bf9706aa064",
    DUMMY_TOKEN_B_ADDRESS = "0x25b8fe1de9daf8ba351890744ff28cf7dfa8f5e3",
} = process.env;

class MockDealer {
    public initialized: boolean;
    private readonly initializing: Promise<void>;
    public tokenA: string;
    public tokenB: string;
    public readonly NULL_ADDRESS: string;
    public serverAddress: string;
    public web3: Web3;
    public web3Wrapper: Web3Wrapper;
    public zeroExContracts: ContractWrappers;
    public EXCHANGE_ADDRESS: string;
    constructor(url: string, serverAddress: string, tokenA: string, tokenB: string) {
        this.initialized = false;
        this.initializing = this.init(url);
        this.tokenA = tokenA;
        this.tokenB = tokenB;
        this.NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
        this.serverAddress = serverAddress;
    }

    public async init(url: string): Promise<void> {
        this.web3 = new Web3(url);
        this.web3Wrapper = new Web3Wrapper(this.web3.currentProvider);

        const networkId = await this.web3.eth.net.getId();

        this.zeroExContracts = new ContractWrappers(this.web3.currentProvider, { networkId });
        this.EXCHANGE_ADDRESS = this.zeroExContracts.exchange.address;
        this.initialized = true;
    }

    public async mock(size: number, side: "bid" | "ask", takerAddress: string): Promise<DealerResponse> {
        await this.initializing;

        const takerAmount = (size * 0.2).toString();

        const sizeStr = size.toString();

        const expiration = Math.floor(Date.now() / 1000) + 20;

        const mock = {
            pair: "TKA/TKB",
            side,
            expiration,
            id: uuid(),
            size,
            fee: 0,
            price: 0.2,
            order: await this.generateOrder(sizeStr, takerAmount, this.tokenA, this.tokenB, expiration),
            takerAddress,
        };
        return mock;
    }

    public async generateOrder(
        makerAmount: string,
        takerAmount: string,
        makerToken: string,
        takerToken: string,
        expiry: number,
    ): Promise<any> {
        // construct raw order object
        const zeroExOrder = {
            makerAddress: this.serverAddress,
            senderAddress: this.NULL_ADDRESS,
            makerAssetAmount: new BigNumber(this.web3.utils.toWei(makerAmount)),
            takerAssetAmount: new BigNumber(this.web3.utils.toWei(takerAmount)),
            expirationTimeSeconds: new BigNumber(expiry),
            makerAssetData: assetDataUtils.encodeERC20AssetData(makerToken),
            takerAssetData: assetDataUtils.encodeERC20AssetData(takerToken),

            // boilerplate fields
            makerFee: new BigNumber(0),
            takerFee: new BigNumber(0),
            salt: generatePseudoRandomSalt(),
            exchangeAddress: this.EXCHANGE_ADDRESS,
            takerAddress: this.NULL_ADDRESS,
            feeRecipientAddress: this.NULL_ADDRESS,
        };

        return signatureUtils.ecSignOrderAsync(
            this.web3.currentProvider,
            zeroExOrder,
            this.serverAddress,
        );
    }

    public async fill(salt: string, clientAccount: string, data: string, sig: string): Promise<string> {
        const receipt = await this.zeroExContracts.exchange.executeTransaction.awaitTransactionSuccessAsync(
            new BigNumber(salt),
            clientAccount,
            data,
            sig,
            {
                from: this.serverAddress,
                gas: new BigNumber(4400000),
            },
        );
        return receipt.transactionHash;
    }
}

const dealer = new MockDealer(WEB3_URL, DEALER_ADDRESS, DUMMY_TOKEN_A_ADDRESS, DUMMY_TOKEN_B_ADDRESS);
export const app = express();
const router = express.Router();

router.get("/quote", async (req, res, next) => {
    await dealer.initialized;
    const {
        side,
        size,
        takerAddress,
    } = req.query;

    const quote = await dealer.mock(parseInt(size), side, takerAddress);
    res.status(200).send(quote);
});

router.get("/assets", async (req, res, next) => {
    await dealer.initialized;
    res.status(200).send({
        TKA: DUMMY_TOKEN_A_ADDRESS,
        TKB: DUMMY_TOKEN_B_ADDRESS,
    });
});

router.post("/order", async (req, res, next) => {
    await dealer.initialized;
    const {
        salt,
        data,
        sig,
        address,
    } = req.body;

    const txId = await dealer.fill(salt, address, data, sig);
    res.status(200).send({ txId });
});

router.get("/markets", async (req, res, next) => {
    await dealer.initialized;
    res.status(200).send(["TKA/TKB"]);
});

app.use(bodyParser.json());
app.use("/api/v2.0", router);
