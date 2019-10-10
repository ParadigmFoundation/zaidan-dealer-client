[Zaidan dealer client](../README.md) › [Globals](../globals.md) › [DealerOptions](dealeroptions.md)

# Interface: DealerOptions

Configuration options for the dealer client.

## Hierarchy

* **DealerOptions**

## Index

### Properties

* [providerUrl](dealeroptions.md#optional-providerurl)
* [takerAddress](dealeroptions.md#optional-takeraddress)
* [txPriority](dealeroptions.md#optional-txpriority)

## Properties

### `Optional` providerUrl

• **providerUrl**? : *string*

*Defined in [types.ts:11](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e23c101/src/types.ts#L11)*

Ethereum JSONRPC provider url (server-side only)

___

### `Optional` takerAddress

• **takerAddress**? : *string*

*Defined in [types.ts:8](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e23c101/src/types.ts#L8)*

Address to use to sign and fill orders.

___

### `Optional` txPriority

• **txPriority**? : *[GasPriority](../globals.md#gaspriority)*

*Defined in [types.ts:14](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e23c101/src/types.ts#L14)*

Optional gas price selector (fast, safeLow, etc.)
