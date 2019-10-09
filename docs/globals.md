[Zaidan dealer client](README.md) › [Globals](globals.md)

# Zaidan dealer client

## Index

### Classes

* [DealerClient](classes/dealerclient.md)

### Interfaces

* [DealerFillTransaction](interfaces/dealerfilltransaction.md)
* [DealerOptions](interfaces/dealeroptions.md)
* [DealerResponse](interfaces/dealerresponse.md)
* [QuoteResponse](interfaces/quoteresponse.md)
* [SwapResponse](interfaces/swapresponse.md)

### Type aliases

* [GasPriority](globals.md#gaspriority)

### Functions

* [convertZeroExTransactionToDealerFill](globals.md#convertzeroextransactiontodealerfill)
* [createAndSignZeroExTransaction](globals.md#createandsignzeroextransaction)
* [getGasPrice](globals.md#getgasprice)

## Type aliases

###  GasPriority

Ƭ **GasPriority**: *"safeLow" | "standard" | "fast" | "fastest"*

*Defined in [types.ts:91](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/types.ts#L91)*

Gas price priority (as used in ETH Gas Station API).

## Functions

###  convertZeroExTransactionToDealerFill

▸ **convertZeroExTransactionToDealerFill**(`fillTx`: SignedZeroExTransaction, `quoteId`: string): *[DealerFillTransaction](interfaces/dealerfilltransaction.md)*

*Defined in [utils.ts:55](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/utils.ts#L55)*

Create a dealer POST /order request body from a signed 0x fill transaction and
the quote ID corresponding to the signed transaction data.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fillTx` | SignedZeroExTransaction | The taker-signed ZEIP-18 fill transaction. |
`quoteId` | string | The quote UUID corresponding to the initial quote request. |

**Returns:** *[DealerFillTransaction](interfaces/dealerfilltransaction.md)*

The necessary request body to submit the fill to the dealer.

___

###  createAndSignZeroExTransaction

▸ **createAndSignZeroExTransaction**(`provider`: SupportedProvider, `signerAddress`: string, `verifyingContractAddress`: string, `order`: SignedOrder, `takerAmount`: BigNumber): *Promise‹SignedZeroExTransaction›*

*Defined in [utils.ts:27](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/utils.ts#L27)*

Given a signed 0x order, signer address, and taker asset amount, prepare and
sign a 0x fill transaction to be submitted to the verifying exchange contract
for the desired network.

Can be used with regular (taker-submitted) fills, as well as ZEIP-18 (sender-
submitted) fills.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`provider` | SupportedProvider | A supported provider (`signerAddress` must be available). |
`signerAddress` | string | The address to sign the fill transaction with. |
`verifyingContractAddress` | string | Usually the 0x exchange contract address for a given network. |
`order` | SignedOrder | A maker-signed 0x order message to create a fill transaction for. |
`takerAmount` | BigNumber | The amount of the available `takerAssetAmount` to fill (base units). |

**Returns:** *Promise‹SignedZeroExTransaction›*

The signed 0x transaction data.

___

###  getGasPrice

▸ **getGasPrice**(`priority`: [GasPriority](globals.md#gaspriority)): *Promise‹BigNumber›*

*Defined in [utils.ts:67](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/1331089/src/utils.ts#L67)*

Fetch a gas price from Etherchain.org for a given priority (tx conf speed).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`priority` | [GasPriority](globals.md#gaspriority) | Get gas price for provided priority (see [GasPricePriority]).  |

**Returns:** *Promise‹BigNumber›*
