[Zaidan dealer client](../README.md) › [Globals](../globals.md) › [DealerResponse](dealerresponse.md)

# Interface: DealerResponse

The base dealer response, fields present for all quotes (swap/bid/ask).

## Hierarchy

* **DealerResponse**

  ↳ [SwapResponse](swapresponse.md)

  ↳ [QuoteResponse](quoteresponse.md)

## Index

### Properties

* [expiration](dealerresponse.md#expiration)
* [fee](dealerresponse.md#fee)
* [id](dealerresponse.md#id)
* [order](dealerresponse.md#order)
* [pair](dealerresponse.md#pair)
* [price](dealerresponse.md#price)
* [size](dealerresponse.md#size)
* [takerAddress](dealerresponse.md#takeraddress)

## Properties

###  expiration

• **expiration**: *number*

*Defined in [types.ts:25](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e3bfe31/src/types.ts#L25)*

The UNIX timestamp at which this offer expires.

___

###  fee

• **fee**: *number*

*Defined in [types.ts:40](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e3bfe31/src/types.ts#L40)*

The required fee from the dealer server.

___

###  id

• **id**: *string*

*Defined in [types.ts:31](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e3bfe31/src/types.ts#L31)*

The unique request ID that refers to this offer.

___

###  order

• **order**: *SignedOrder*

*Defined in [types.ts:43](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e3bfe31/src/types.ts#L43)*

The signed maker order from the dealer server.

___

###  pair

• **pair**: *string*

*Defined in [types.ts:28](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e3bfe31/src/types.ts#L28)*

The market symbol the quote is for

___

###  price

• **price**: *number*

*Defined in [types.ts:34](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e3bfe31/src/types.ts#L34)*

The price and order data for the quote.

___

###  size

• **size**: *number*

*Defined in [types.ts:37](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e3bfe31/src/types.ts#L37)*

The taker size, specified in the initial request.

___

###  takerAddress

• **takerAddress**: *string*

*Defined in [types.ts:22](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e3bfe31/src/types.ts#L22)*

The taker address which must fill the order (no other taker will be accepted).
