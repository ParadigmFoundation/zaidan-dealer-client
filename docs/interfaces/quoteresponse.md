[Zaidan dealer client](../README.md) › [Globals](../globals.md) › [QuoteResponse](quoteresponse.md)

# Interface: QuoteResponse


The dealer's response for a currency pair quote (bid/ask on X/Y pair).

## Hierarchy

* [DealerResponse](dealerresponse.md)

  ↳ **QuoteResponse**

## Index

### Properties

* [expiration](quoteresponse.md#expiration)
* [fee](quoteresponse.md#fee)
* [id](quoteresponse.md#id)
* [order](quoteresponse.md#order)
* [pair](quoteresponse.md#pair)
* [price](quoteresponse.md#price)
* [side](quoteresponse.md#side)
* [size](quoteresponse.md#size)

## Properties

###  expiration

• **expiration**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[expiration](dealerresponse.md#expiration)*

*Defined in [types.ts:8](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L8)*

The UNIX timestamp at which this offer expires.

___

###  fee

• **fee**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[fee](dealerresponse.md#fee)*

*Defined in [types.ts:23](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L23)*

The required fee from the dealer server.

___

###  id

• **id**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[id](dealerresponse.md#id)*

*Defined in [types.ts:14](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L14)*

The unique request ID that refers to this offer.

___

###  order

• **order**: *SignedOrder*

*Inherited from [DealerResponse](dealerresponse.md).[order](dealerresponse.md#order)*

*Defined in [types.ts:26](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L26)*

The signed maker order from the dealer server.

___

###  pair

• **pair**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[pair](dealerresponse.md#pair)*

*Defined in [types.ts:11](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L11)*

The market symbol the quote is for

___

###  price

• **price**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[price](dealerresponse.md#price)*

*Defined in [types.ts:17](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L17)*

The price and order data for the quote.

___

###  side

• **side**: *string*

*Defined in [types.ts:45](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L45)*

The side of the quote (bid or ask).

___

###  size

• **size**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[size](dealerresponse.md#size)*

*Defined in [types.ts:20](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/df02572/src/types.ts#L20)*

The taker size, specified in the initial request.