import { SignedOrder, ZeroExTransaction } from "@0x/types";
import { BigNumber } from "@0x/utils";

import { Quote, QuoteJSON, SignedOrderJSON, ZeroExTransactionJSON } from "./types";

/**
 * Parse a JSON representation of a dealer quote into a `Quote` type.
 *
 * @param signedOrderJSON a JSON representation of a signed 0x order
 */
export function parseQuoteJSON(quoteJSON: QuoteJSON): Quote {
    const {
        quoteId,
        makerAssetAddress,
        takerAssetAddress,
        makerAssetSize,
        takerAssetSize,
        expiration,
        serverTime,
        zeroExTransactionHash,
        zeroExTransactionInfo,
    } = quoteJSON;

    const { chainId, exchangeAddress } = zeroExTransactionInfo.order;

    const quote: Quote = {
        quoteId,
        makerAssetAddress,
        takerAssetAddress,
        makerAssetSize: new BigNumber(makerAssetSize),
        takerAssetSize: new BigNumber(takerAssetSize),
        expiration: new BigNumber(expiration),
        serverTime: new BigNumber(serverTime),
        zeroExTransactionHash,
        zeroExTransactionInfo: {
            order: parseSignedOrderJSON(zeroExTransactionInfo.order),
            transaction: parseZeroExTransactionJSON(zeroExTransactionInfo.transaction, chainId, exchangeAddress),
        },
    };

    return quote;
}

/**
 * Parse a JSON representation of a signed order into a `SignedOrder` type.
 *
 * @param signedOrderJSON a JSON representation of a signed 0x order
 */
export function parseSignedOrderJSON(signedOrderJSON: SignedOrderJSON): SignedOrder {
    const order: SignedOrder = {
        chainId: signedOrderJSON.chainId,
        exchangeAddress: signedOrderJSON.exchangeAddress,
        makerAddress: signedOrderJSON.makerAddress,
        makerAssetData: signedOrderJSON.makerAssetData,
        makerFeeAssetData: signedOrderJSON.makerFeeAssetData,
        makerAssetAmount: new BigNumber(signedOrderJSON.makerAssetAmount),
        makerFee: new BigNumber(signedOrderJSON.makerFee),
        takerAddress: signedOrderJSON.takerAddress,
        takerAssetData: signedOrderJSON.takerAssetData,
        takerFeeAssetData: signedOrderJSON.takerFeeAssetData,
        takerAssetAmount: new BigNumber(signedOrderJSON.takerAssetAmount),
        takerFee: new BigNumber(signedOrderJSON.takerFee),
        senderAddress: signedOrderJSON.senderAddress,
        feeRecipientAddress: signedOrderJSON.feeRecipientAddress,
        expirationTimeSeconds: new BigNumber(signedOrderJSON.expirationTimeSeconds),
        salt: new BigNumber(signedOrderJSON.salt),
        signature: signedOrderJSON.signature,
    };

    return order;
}

/**
 * Parse a 0x transaction's JSON representation into a `ZeroExTransaction` type.
 *
 * @param ztxJSON the JSON representation of a 0x transaction
 * @param chainId the EIP-155 chain ID this transaction is valid for
 * @param verifyingContract the address of the contract verifying this transaction
 */
export function parseZeroExTransactionJSON(
    ztxJSON: ZeroExTransactionJSON,
    chainId: number,
    verifyingContract: string,
): ZeroExTransaction {
    const transaction: ZeroExTransaction = {
        salt: new BigNumber(ztxJSON.salt),
        expirationTimeSeconds: new BigNumber(ztxJSON.expirationTimeSeconds),
        gasPrice: new BigNumber(ztxJSON.gasPrice),
        signerAddress: ztxJSON.signerAddress,
        data: ztxJSON.data,
        domain: { chainId, verifyingContract },
    };

    return transaction;
}
