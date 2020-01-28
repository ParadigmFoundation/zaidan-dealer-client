import { SignedOrder, ZeroExTransaction } from "@0x/types";
import { BigNumber } from "@0x/utils";

export interface Quote {
    quoteId: string;
    makerAssetAddress: string;
    takerAssetAddress: string;
    makerAssetSize: BigNumber;
    takerAssetSize: BigNumber;
    expiration: BigNumber;
    serverTime: BigNumber;
    zeroExTransactionHash: string;
    zeroExTransactionInfo: ZeroExTransactionInfo;
}

export interface ZeroExTransactionInfo {
    order: SignedOrder;
    transaction: ZeroExTransaction;
}

export interface QuoteJSON {
    quoteId: string;
    makerAssetAddress: string;
    takerAssetAddress: string;
    makerAssetSize: string;
    takerAssetSize: string;
    expiration: number;
    serverTime: number;
    zeroExTransactionHash: string;
    zeroExTransactionInfo: ZeroExTransactionInfoJSON;
}

export interface ZeroExTransactionInfoJSON {
    order: SignedOrderJSON;
    transaction: ZeroExTransactionJSON;
}

export interface OrderJSON {
    chainId: number;
    exchangeAddress: string;
    makerAddress: string;
    makerAssetData: string;
    makerFeeAssetData: string;
    makerAssetAmount: string;
    makerFee: string;
    takerAddress: string;
    takerAssetData: string;
    takerFeeAssetData: string;
    takerAssetAmount: string;
    takerFee: string;
    senderAddress: string;
    feeRecipientAddress: string;
    expirationTimeSeconds: string;
    salt: string;
    signature: string;
}

export interface SignedOrderJSON extends OrderJSON {
    signature: string;
}

export interface ZeroExTransactionJSON {
    data: string;
    expirationTimeSeconds: string;
    gasPrice: string;
    salt: string;
    signerAddress: string;
}
