[Zaidan dealer client](README.md) › [Globals](globals.md)

# Zaidan dealer client

## Index

### Classes

* [DealerClient](classes/dealerclient.md)

### Interfaces

* [AuthorizationInfo](interfaces/authorizationinfo.md)
* [DealerFillTransaction](interfaces/dealerfilltransaction.md)
* [DealerOptions](interfaces/dealeroptions.md)
* [DealerResponse](interfaces/dealerresponse.md)
* [QuoteResponse](interfaces/quoteresponse.md)
* [SwapResponse](interfaces/swapresponse.md)

### Type aliases

* [AuthorizationReason](globals.md#authorizationreason)
* [GasPriority](globals.md#gaspriority)

### Functions

* [convertZeroExTransactionToDealerFill](globals.md#convertzeroextransactiontodealerfill)
* [createAndSignZeroExTransaction](globals.md#createandsignzeroextransaction)
* [getGasPrice](globals.md#getgasprice)

## Type aliases

###  AuthorizationReason

Ƭ **AuthorizationReason**: *"NOT_WHITELISTED" | "BLACKLISTED" | "WHITELISTED" | "NOT_BLACKLISTED" | "IN_WAITLIST"*

*Defined in [types.ts:102](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L102)*

Possible reasons for a given boolean authorization status.

___

###  GasPriority

Ƭ **GasPriority**: *"safeLow" | "standard" | "fast" | "fastest"*

*Defined in [types.ts:97](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/types.ts#L97)*

Gas price priority (as used in ETH Gas Station API).

## Functions

###  convertZeroExTransactionToDealerFill

▸ **convertZeroExTransactionToDealerFill**(`provider`: SupportedProvider, `chainId`: number, `fillTx`: SignedZeroExTransaction, `quoteId`: string): *Promise‹[DealerFillTransaction](interfaces/dealerfilltransaction.md)›*

*Defined in [utils.ts:71](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/utils.ts#L71)*

Create a dealer POST /order request body from a signed 0x fill transaction and
the quote ID corresponding to the signed transaction data.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`provider` | SupportedProvider | A supported Ethereum JSONRPC provider. |
`chainId` | number | The Ethereum chain ID of the verifying contract. |
`fillTx` | SignedZeroExTransaction | The taker-signed ZEIP-18 fill transaction. |
`quoteId` | string | The quote UUID corresponding to the initial quote request. |

**Returns:** *Promise‹[DealerFillTransaction](interfaces/dealerfilltransaction.md)›*

The necessary request body to submit the fill to the dealer.

___

###  createAndSignZeroExTransaction

▸ **createAndSignZeroExTransaction**(`provider`: SupportedProvider, `signerAddress`: string, `verifyingContractAddress`: string, `order`: SignedOrder, `takerAmount`: BigNumber, `gasPrice`: BigNumber): *Promise‹SignedZeroExTransaction›*

*Defined in [utils.ts:28](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/utils.ts#L28)*

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
`gasPrice` | BigNumber | - |

**Returns:** *Promise‹SignedZeroExTransaction›*

The signed 0x transaction data.

___

###  getGasPrice

▸ **getGasPrice**(`priority`: [GasPriority](globals.md#gaspriority)): *Promise‹BigNumber›*

*Defined in [utils.ts:90](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/8857c4e/src/utils.ts#L90)*

Fetch a gas price from Etherchain.org for a given priority (tx conf speed).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`priority` | [GasPriority](globals.md#gaspriority) | Get gas price for provided priority (see [GasPricePriority]).  |

**Returns:** *Promise‹BigNumber›*
