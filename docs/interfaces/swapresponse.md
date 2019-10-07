[Zaidan dealer client](../README.md) › [Globals](../globals.md) › [SwapResponse](swapresponse.md)

# Interface: SwapResponse


The dealer's response for a swap quote (swap `n` of `Y` for equivalent amount of `Z`).

## Hierarchy

* [DealerResponse](dealerresponse.md)

  ↳ **SwapResponse**

## Index

### Properties

* [clientAsset](swapresponse.md#clientasset)
* [dealerAsset](swapresponse.md#dealerasset)
* [expiration](swapresponse.md#expiration)
* [fee](swapresponse.md#fee)
* [id](swapresponse.md#id)
* [order](swapresponse.md#order)
* [pair](swapresponse.md#pair)
* [price](swapresponse.md#price)
* [size](swapresponse.md#size)

## Properties

###  clientAsset

• **clientAsset**: *string*

*Defined in [types.ts:37](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/d876e14/src/types.ts#L37)*

The asset (ticker) the client will send to the dealer.

___

###  dealerAsset

• **dealerAsset**: *string*

*Defined in [types.ts:34](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/d876e14/src/types.ts#L34)*

The asset (ticker) the dealer will send to the client.

___

###  expiration

• **expiration**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[expiration](dealerresponse.md#expiration)*

*Defined in [types.ts:8](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/d876e14/src/types.ts#L8)*

The UNIX timestamp at which this offer expires.

___

###  fee

• **fee**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[fee](dealerresponse.md#fee)*

*Defined in [types.ts:23](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/d876e14/src/types.ts#L23)*

The required fee from the dealer server.

___

###  id

• **id**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[id](dealerresponse.md#id)*

*Defined in [types.ts:14](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/d876e14/src/types.ts#L14)*

The unique request ID that refers to this offer.

___

###  order

• **order**: *SignedOrder*

*Inherited from [DealerResponse](dealerresponse.md).[order](dealerresponse.md#order)*

*Defined in [types.ts:26](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/d876e14/src/types.ts#L26)*

The signed maker order from the dealer server.

___

###  pair

• **pair**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[pair](dealerresponse.md#pair)*

*Defined in [types.ts:11](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/d876e14/src/types.ts#L11)*

The market symbol the quote is for

___

###  price

• **price**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[price](dealerresponse.md#price)*

*Defined in [types.ts:17](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/d876e14/src/types.ts#L17)*

The price and order data for the quote.

___

###  size

• **size**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[size](dealerresponse.md#size)*

*Defined in [types.ts:20](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/d876e14/src/types.ts#L20)*

The taker size, specified in the initial request.