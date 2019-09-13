[Zaidan dealer client](../README.md) › [Globals](../globals.md) › [DealerResponse](dealerresponse.md)

# Interface: DealerResponse


A quote response from the dealer server.

The parsed output of a GET /quote request.

## Hierarchy

* **DealerResponse**

## Index

### Properties

* [expiration](dealerresponse.md#expiration)
* [fee](dealerresponse.md#fee)
* [id](dealerresponse.md#id)
* [order](dealerresponse.md#order)
* [price](dealerresponse.md#price)
* [size](dealerresponse.md#size)

## Properties

###  expiration

• **expiration**: *number*

*Defined in [types.ts:10](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/types.ts#L10)*

The UNIX timestamp at which this offer expires.

___

###  fee

• **fee**: *number*

*Defined in [types.ts:22](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/types.ts#L22)*

The required fee from the dealer server.

___

###  id

• **id**: *string*

*Defined in [types.ts:13](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/types.ts#L13)*

The unique request ID that refers to this offer.

___

###  order

• **order**: *SignedOrder*

*Defined in [types.ts:25](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/types.ts#L25)*

The signed maker order from the dealer server.

___

###  price

• **price**: *number*

*Defined in [types.ts:16](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/types.ts#L16)*

The price and order data for the quote.

___

###  size

• **size**: *number*

*Defined in [types.ts:19](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/types.ts#L19)*

The taker size, specified in the initial request.