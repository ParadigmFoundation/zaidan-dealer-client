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

## Properties

###  expiration

• **expiration**: *number*

*Defined in [types.ts:8](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L8)*

The UNIX timestamp at which this offer expires.

___

###  fee

• **fee**: *number*

*Defined in [types.ts:23](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L23)*

The required fee from the dealer server.

___

###  id

• **id**: *string*

*Defined in [types.ts:14](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L14)*

The unique request ID that refers to this offer.

___

###  order

• **order**: *SignedOrder*

*Defined in [types.ts:26](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L26)*

The signed maker order from the dealer server.

___

###  pair

• **pair**: *string*

*Defined in [types.ts:11](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L11)*

The market symbol the quote is for

___

###  price

• **price**: *number*

*Defined in [types.ts:17](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L17)*

The price and order data for the quote.

___

###  size

• **size**: *number*

*Defined in [types.ts:20](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L20)*

The taker size, specified in the initial request.