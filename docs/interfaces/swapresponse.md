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
* [gasPrice](swapresponse.md#gasprice)
* [id](swapresponse.md#id)
* [order](swapresponse.md#order)
* [pair](swapresponse.md#pair)
* [price](swapresponse.md#price)
* [size](swapresponse.md#size)
* [takerAddress](swapresponse.md#takeraddress)

## Properties

###  clientAsset

• **clientAsset**: *string*

*Defined in [types.ts:57](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L57)*

The asset (ticker) the client will send to the dealer.

___

###  dealerAsset

• **dealerAsset**: *string*

*Defined in [types.ts:54](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L54)*

The asset (ticker) the dealer will send to the client.

___

###  expiration

• **expiration**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[expiration](dealerresponse.md#expiration)*

*Defined in [types.ts:25](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L25)*

The UNIX timestamp at which this offer expires.

___

###  fee

• **fee**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[fee](dealerresponse.md#fee)*

*Defined in [types.ts:40](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L40)*

The required fee from the dealer server.

___

###  gasPrice

• **gasPrice**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[gasPrice](dealerresponse.md#gasprice)*

*Defined in [types.ts:46](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L46)*

The gas price the dealer will use to submit the fill (incl. in 0x transaction message).

___

###  id

• **id**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[id](dealerresponse.md#id)*

*Defined in [types.ts:31](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L31)*

The unique request ID that refers to this offer.

___

###  order

• **order**: *SignedOrder*

*Inherited from [DealerResponse](dealerresponse.md).[order](dealerresponse.md#order)*

*Defined in [types.ts:43](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L43)*

The signed maker order from the dealer server.

___

###  pair

• **pair**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[pair](dealerresponse.md#pair)*

*Defined in [types.ts:28](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L28)*

The market symbol the quote is for

___

###  price

• **price**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[price](dealerresponse.md#price)*

*Defined in [types.ts:34](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L34)*

The price and order data for the quote.

___

###  size

• **size**: *number*

*Inherited from [DealerResponse](dealerresponse.md).[size](dealerresponse.md#size)*

*Defined in [types.ts:37](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L37)*

The taker size, specified in the initial request.

___

###  takerAddress

• **takerAddress**: *string*

*Inherited from [DealerResponse](dealerresponse.md).[takerAddress](dealerresponse.md#takeraddress)*

*Defined in [types.ts:22](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L22)*

The taker address which must fill the order (no other taker will be accepted).
