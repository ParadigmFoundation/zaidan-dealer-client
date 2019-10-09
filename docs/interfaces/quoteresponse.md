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
* [takerAddress](quoteresponse.md#takeraddress)

## Properties

###  expiration

• **expiration**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[expiration](dealerresponse.md#expiration)*

*Defined in [types.ts:25](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/types.ts#L25)*

The UNIX timestamp at which this offer expires.

___

###  fee

• **fee**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[fee](dealerresponse.md#fee)*

*Defined in [types.ts:40](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/types.ts#L40)*

The required fee from the dealer server.

___

###  id

• **id**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[id](dealerresponse.md#id)*

*Defined in [types.ts:31](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/types.ts#L31)*

The unique request ID that refers to this offer.

___

###  order

• **order**: *SignedOrder*

*Inherited from [DealerResponse](dealerresponse.md).[order](dealerresponse.md#order)*

*Defined in [types.ts:43](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/types.ts#L43)*

The signed maker order from the dealer server.

___

###  pair

• **pair**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[pair](dealerresponse.md#pair)*

*Defined in [types.ts:28](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/types.ts#L28)*

The market symbol the quote is for

___

###  price

• **price**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[price](dealerresponse.md#price)*

*Defined in [types.ts:34](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/types.ts#L34)*

The price and order data for the quote.

___

###  side

• **side**: *string*

*Defined in [types.ts:62](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/types.ts#L62)*

The side of the quote (bid or ask).

___

###  size

• **size**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[size](dealerresponse.md#size)*

*Defined in [types.ts:37](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/types.ts#L37)*

The taker size, specified in the initial request.

___

###  takerAddress

• **takerAddress**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[takerAddress](dealerresponse.md#takeraddress)*

*Defined in [types.ts:22](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/types.ts#L22)*

The taker address which must fill the order (no other taker will be accepted).
