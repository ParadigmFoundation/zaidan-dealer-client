import { SignedOrder } from "0x.js";

/**
 * A quote response from the dealer server.
 *
 * The parsed output of a GET /quote request.
 */
export interface DealerResponse {
    /** The UNIX timestamp at which this offer expires. */
    expiration: number;

    /** The unique request ID that refers to this offer. */
    id: string;

    /** The price and order data for the quote. */
    price: number;

    /** The taker size, specified in the initial request. */
    size: number;

    /** The required fee from the dealer server. */
    fee: number;

    /** The signed maker order from the dealer server. */
    order: SignedOrder;
}

/**
 * Gas price priority (as used in ETH Gas Station API).
 */
export type GasPriority = "safeLow" | "standard" | "fast";
