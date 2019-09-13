[Zaidan dealer client](../README.md) › [Globals](../globals.md) › [ERC20Token](erc20token.md)

# Class: ERC20Token


Convenience class for interacting with multiple ERC-20 tokens through a single
class, without needing to instantiate new contract instances for each token
address used.

Instances of the `ERC20Token` class provide methods for checking balances,
allowances, and proxy allowances for the 0x ERC-20 asset proxy contract. It
also provides methods for setting arbitrary or unlimited ERC-20 proxy allowances
without needing to manually specify the asset proxy address.

## Hierarchy

* **ERC20Token**

## Index

### Constructors

* [constructor](erc20token.md#constructor)

### Properties

* [UNLIMITED_ALLOWANCE](erc20token.md#static-unlimited_allowance)

### Methods

* [getAllowanceAsync](erc20token.md#getallowanceasync)
* [getBalanceAsync](erc20token.md#getbalanceasync)
* [getERC20ProxyAddressAsync](erc20token.md#geterc20proxyaddressasync)
* [getNetworkIdAsync](erc20token.md#getnetworkidasync)
* [getProxyAllowanceAsync](erc20token.md#getproxyallowanceasync)
* [setProxyAllowanceAsync](erc20token.md#setproxyallowanceasync)
* [setUnlimitedProxyAllowanceAsync](erc20token.md#setunlimitedproxyallowanceasync)

## Constructors

###  constructor

\+ **new ERC20Token**(`provider`: SupportedProvider): *[ERC20Token](erc20token.md)*

*Defined in [ERC20Token.ts:26](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/ERC20Token.ts#L26)*

Create a new `ERC20Token` instance with a Web3 provider to access convenience
methods for interacting with arbitrary ERC-20 tokens and the 0x ERC-20 asset
proxy contract.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`provider` | SupportedProvider | A supported Web3 JSONRPC provider  |

**Returns:** *[ERC20Token](erc20token.md)*

## Properties

### `Static` UNLIMITED_ALLOWANCE

▪ **UNLIMITED_ALLOWANCE**: *BigNumber* =  new BigNumber(2).exponentiatedBy(256).minus(1)

*Defined in [ERC20Token.ts:17](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/ERC20Token.ts#L17)*

## Methods

###  getAllowanceAsync

▸ **getAllowanceAsync**(`tokenAddress`: string, `userAddress`: string, `spenderAddress`: string): *Promise‹BigNumber›*

*Defined in [ERC20Token.ts:63](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/ERC20Token.ts#L63)*

Fetch user's ERC-20 allowance for a specific spender in base units (wei).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenAddress` | string | The ERC-20 token contract address. |
`userAddress` | string | User's address to fetch allowance for. |
`spenderAddress` | string | The spender address to fetch allowance for.  |

**Returns:** *Promise‹BigNumber›*

___

###  getBalanceAsync

▸ **getBalanceAsync**(`tokenAddress`: string, `userAddress`: string): *Promise‹BigNumber›*

*Defined in [ERC20Token.ts:50](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/ERC20Token.ts#L50)*

Fetch user's ERC-20 token balance in base units (wei).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenAddress` | string | The ERC-20 token contract address. |
`userAddress` | string | User's address to fetch balance for.  |

**Returns:** *Promise‹BigNumber›*

___

###  getERC20ProxyAddressAsync

▸ **getERC20ProxyAddressAsync**(): *Promise‹string›*

*Defined in [ERC20Token.ts:130](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/ERC20Token.ts#L130)*

Fetch the 0x ERC-20 asset proxy address for the current network.

**Returns:** *Promise‹string›*

___

###  getNetworkIdAsync

▸ **getNetworkIdAsync**(): *Promise‹number›*

*Defined in [ERC20Token.ts:122](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/ERC20Token.ts#L122)*

Fetch the current detected networkId.

**Returns:** *Promise‹number›*

___

###  getProxyAllowanceAsync

▸ **getProxyAllowanceAsync**(`tokenAddress`: string, `userAddress`: string): *Promise‹BigNumber›*

*Defined in [ERC20Token.ts:76](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/ERC20Token.ts#L76)*

Fetch user's 0x ERC-20 proxy allowance for a given token in base units (wei).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenAddress` | string | The ERC-20 token contract address. |
`userAddress` | string | User's address to fetch 0x ERC-20 proxy allowance for.  |

**Returns:** *Promise‹BigNumber›*

___

###  setProxyAllowanceAsync

▸ **setProxyAllowanceAsync**(`tokenAddress`: string, `allowance`: BigNumber, `txOptions?`: TxData): *Promise‹string›*

*Defined in [ERC20Token.ts:91](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/ERC20Token.ts#L91)*

Set user's 0x ERC-20 proxy allowance for a given token in base units (wei).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenAddress` | string | The ERC-20 token contract address. |
`allowance` | BigNumber | The desired allowance (in wei) to set for the ERC-20 proxy. |
`txOptions?` | TxData | Optional transaction options (gas price, etc). |

**Returns:** *Promise‹string›*

The resulting transaction hash.

___

###  setUnlimitedProxyAllowanceAsync

▸ **setUnlimitedProxyAllowanceAsync**(`tokenAddress`: string, `txOptions?`: TxData): *Promise‹string›*

*Defined in [ERC20Token.ts:109](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bdfe3d3/src/ERC20Token.ts#L109)*

Set an unlimited allowance for the 0x ERC-20 proxy allowance for a given
token and user address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenAddress` | string | The ERC-20 token contract address. |
`txOptions?` | TxData | Optional transaction options (gas price, etc). |

**Returns:** *Promise‹string›*

The resulting transaction hash.