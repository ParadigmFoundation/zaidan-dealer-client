[Zaidan dealer client](../README.md) › [Globals](../globals.md) › [DealerClient](dealerclient.md)

# Class: DealerClient


A simple client for the Zaidan dealer server.

## Hierarchy

* **DealerClient**

## Index

### Constructors

* [constructor](dealerclient.md#constructor)

### Properties

* [GAS_PRICE](dealerclient.md#gas_price)
* [coinbase](dealerclient.md#coinbase)
* [contractWrappers](dealerclient.md#contractwrappers)
* [initialized](dealerclient.md#initialized)
* [isBrowser](dealerclient.md#isbrowser)
* [networkId](dealerclient.md#networkid)
* [pairs](dealerclient.md#pairs)
* [subProvider](dealerclient.md#subprovider)
* [tokens](dealerclient.md#tokens)
* [web3](dealerclient.md#web3)
* [web3Wrapper](dealerclient.md#web3wrapper)
* [MAX_ALLOWANCE](dealerclient.md#static-max_allowance)

### Methods

* [fromWei](dealerclient.md#fromwei)
* [getBalance](dealerclient.md#getbalance)
* [getEtherscanLink](dealerclient.md#getetherscanlink)
* [getQuote](dealerclient.md#getquote)
* [getSwapQuote](dealerclient.md#getswapquote)
* [handleTrade](dealerclient.md#handletrade)
* [hasAllowance](dealerclient.md#hasallowance)
* [init](dealerclient.md#init)
* [makeBigNumber](dealerclient.md#makebignumber)
* [setAllowance](dealerclient.md#setallowance)
* [supportedTickers](dealerclient.md#supportedtickers)
* [toWei](dealerclient.md#towei)
* [waitForTransactionSuccessOrThrow](dealerclient.md#waitfortransactionsuccessorthrow)

## Constructors

###  constructor

\+ **new DealerClient**(`dealerUri`: string, `web3Uri?`: string, `gasPrice`: number): *[DealerClient](dealerclient.md)*

*Defined in [DealerClient.ts:72](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L72)*

Instantiate a new DealerClient. Prior to use, `client.init()` should
be called, which triggers a prompt for the user to allow MetaMask to
connect to the site.

For usage in server-side applications, provide a second argument to the
constructor with an Ethereum JSONRPC URL, which will override the default
setting of attempting to load a web3 provider through the browser.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`dealerUri` | string | - | the base RPC API path for the dealer server |
`web3Uri?` | string | - | optional Ethereum JSONRPC url for server-side usage |
`gasPrice` | number | 5 | optionally set the gas price for allowance transactions  |

**Returns:** *[DealerClient](dealerclient.md)*

## Properties

###  GAS_PRICE

• **GAS_PRICE**: *BigNumber*

*Defined in [DealerClient.ts:72](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L72)*

Default gas price to use for allowance transactions.

___

###  coinbase

• **coinbase**: *string*

*Defined in [DealerClient.ts:60](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L60)*

Stores the current user's coinbase address.

___

###  contractWrappers

• **contractWrappers**: *ContractWrappers*

*Defined in [DealerClient.ts:63](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L63)*

Initialized contract wrappers for interacting with the 0x system.

___

###  initialized

• **initialized**: *boolean*

*Defined in [DealerClient.ts:66](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L66)*

Set to 'true' after a successful .init(), must be called before use.

___

###  isBrowser

• **isBrowser**: *boolean*

*Defined in [DealerClient.ts:69](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L69)*

Set to 'true' if browser environment is detected.

___

###  networkId

• **networkId**: *number*

*Defined in [DealerClient.ts:57](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L57)*

Stores the configured Ethereum network ID.

___

###  pairs

• **pairs**: *string[]*

*Defined in [DealerClient.ts:40](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L40)*

An array of the currently supported pairs (as expected by `getQuote`).

___

###  subProvider

• **subProvider**: *MetamaskSubprovider*

*Defined in [DealerClient.ts:54](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L54)*

SubProvider instance used to interact with MetaMask.

___

###  tokens

• **tokens**: *object*

*Defined in [DealerClient.ts:45](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L45)*

Maps tokenTicker => address for looking up common tokens.

#### Type declaration:

* \[ **ticker**: *string*\]: string

___

###  web3

• **web3**: *Web3*

*Defined in [DealerClient.ts:48](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L48)*

Main Web3 instance for interacting with Ethereum.

___

###  web3Wrapper

• **web3Wrapper**: *Web3Wrapper*

*Defined in [DealerClient.ts:51](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L51)*

Provides additional convenience methods for interacting with web3.

___

### `Static` MAX_ALLOWANCE

▪ **MAX_ALLOWANCE**: *BigNumber* =  new BigNumber(2).exponentiatedBy(256).minus(1)

*Defined in [DealerClient.ts:23](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L23)*

2^256 - 1 represents an effectively "unlimited" allowance

## Methods

###  fromWei

▸ **fromWei**(`weiAmount`: string): *string*

*Defined in [DealerClient.ts:426](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L426)*

Convert a number of tokens, denominated in the smallest unit - "wei" - to
"full" units, called "ether". One ether = 1*10^18 wei.

All contract calls require amounts in wei, but the user should be shown
amounts in ether. All values are strings to avoid precision issues.

**`example`** 
```javascript
client.fromWei("100000000000000000000") // > "100"
client.fromWei("10000000000000000000")   // > "10"
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`weiAmount` | string | The token amount in wei to convert. |

**Returns:** *string*

The same amount in ether, string returned for precision.

___

###  getBalance

▸ **getBalance**(`tokenTicker`: string): *Promise‹string›*

*Defined in [DealerClient.ts:376](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L376)*

Return the user's balance (in wei) of a specified supported token. Only
supported tickers will work (see `client.tokens`).

Return balance is in base units (wei), and returned as a string. Convert
to a `BigNumber` instance for math.

**`example`** 
```javascript
// return value is in 'wei', so convert if needed before displaying
await client.getBalance("WETH") // > "12597034312510000"
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenTicker` | string | The token's short ticker (ex. "ZRX", "DAI"). |

**Returns:** *Promise‹string›*

The user's balance of the token in wei, as a string.

___

###  getEtherscanLink

▸ **getEtherscanLink**(`txId`: string): *string*

*Defined in [DealerClient.ts:460](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L460)*

Returns the URL of the Etherscan status page for the specified TX ID.

Useful for generating a link to show the user a transaction's status.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`txId` | string | A valid Ethereum transaction ID. |

**Returns:** *string*

A string that can be used as a hyperlink to etherscan.

___

###  getQuote

▸ **getQuote**(`size`: number, `symbol`: string, `side`: string): *Promise‹[DealerResponse](../interfaces/dealerresponse.md)›*

*Defined in [DealerClient.ts:178](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L178)*

Request a price quote a signed order from the dealer server. The response
includes price and fee information, as well as signed 0x order message for
the quote

The order in the quote can be passed to `client.handleTrade()` which will
request a signature from the client according to ZEIP-18, and will prepare
a fill transaction for the dealer to fill.

**`example`** 
```javascript
const response = await client.getQuote(2, "WETH/DAI", "bid");

// response object example:
response = {
  expiration: 1559170656.0712497,
  id: "e68b5aa8-f84c-45b8-a312-eef35bba480f",
  size: 2,
  price: 3,
  order: {}, // will be a full signed 0x order object
  fee: 0.2156,
}
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`size` | number | the amount of tokens the user is selling/buying (in units of base asset) |
`symbol` | string | the token pair the swap is for (ex: "WETH/DAI") |
`side` | string | either 'bid' or 'ask' depending on desired quote side |

**Returns:** *Promise‹[DealerResponse](../interfaces/dealerresponse.md)›*

a price quote and signed maker order from the dealer server

___

###  getSwapQuote

▸ **getSwapQuote**(`size`: number, `clientAsset`: string, `dealerAsset`: string): *Promise‹[DealerResponse](../interfaces/dealerresponse.md)›*

*Defined in [DealerClient.ts:216](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L216)*

An alternative interface for fetching a price quote using the concept of
an asset "swap" as opposed to a conventional base/quote bid/ask interface.

Conceptually, the method allows you to swap `size` of `clientAsset` for an
equivalent amount of `dealerAsset`, based on the price returned by the
dealer server.

Under the hood, the request still goes through as a bid/ask, but allows
for users to swap for specific amounts of assets that may only be served
as a quote asset. For example, you can swap 100 DAI for wrapped ETH even
if only the WETH/DAI pair is supported. Normally the quote would have to
be requested in terms of WETH.

**`example`** 
```javascript
// fetch a quote to swap 100 DAI for WETH
const { order, id } = await dealer.getSwapQuote(100, "DAI", "WETH");

// request for the trade to be filled
const txId = await dealer.handleTrade(order, id);
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`size` | number | the amount of takerAsset to swap for |
`clientAsset` | string | the ticker of the asset being sold (swapping for dealerAsset) |
`dealerAsset` | string | the ticker of the asset being bought that a price is quoted for |

**Returns:** *Promise‹[DealerResponse](../interfaces/dealerresponse.md)›*

A price quote and signed maker order from the dealer server.

___

###  handleTrade

▸ **handleTrade**(`order`: SignedOrder, `quoteId`: string): *Promise‹string›*

*Defined in [DealerClient.ts:262](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L262)*

Sign a 0x `fillOrder` transaction message, and submit it back to the
server for settlement. Signs a fill transaction for the entire specified
`takerAssetAmount`.

Allowances should be checked prior to calling this method.

**`example`** 
```javascript
// load a signed order from a quote
const dealerRes = await dealer.getQuote(10, "WETH/DAI", "bid");
const order = dealerRes.order;
const id = dealerRes.id;

// submit the trade for settlement
const txId = await dealer.handleTrade(order, id);

// get a link to the transaction on Etherscan
const link = dealer.getEtherscanLink(txId);

// wait for trade to complete (throws if fails)
await dealer.waitForTransactionSuccessOrThrow(txId);
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`order` | SignedOrder | The signed maker order to submit for execution. |
`quoteId` | string | The unique quote UUID provided by the dealer server. |

**Returns:** *Promise‹string›*

A promise that resolves to txId of the trade.

___

###  hasAllowance

▸ **hasAllowance**(`tokenTicker`: string): *Promise‹boolean›*

*Defined in [DealerClient.ts:320](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L320)*

Check if the user has set an allowance for the specified token. If the
method returns `false`, allowance can be set with `client.setAllowance`.

Only works with supported tokens (see `client.tokens`).

**`example`** 
```javascript
// no allowance is set
await client.hasAllowance("DAI") // > false

// will be `true` after setting allowance
await client.setAllowance("DAI")
await client.hasAllowance("DAI") // > true
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenTicker` | string | The token's short ticker (ex. "ZRX", "DAI"). |

**Returns:** *Promise‹boolean›*

Resolves to `true` if the user has a non-0 allowance for the token.

___

###  init

▸ **init**(): *Promise‹void›*

*Defined in [DealerClient.ts:116](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L116)*

Initialize a DealerClient instance. A call to `client.init()` will trigger
a MetaMask pop-up prompting the user to sign in, or allow the site access.

If the user has already allowed site access, the prompt will be skipped.

**Returns:** *Promise‹void›*

A promise that resolves when initialization is complete.

___

###  makeBigNumber

▸ **makeBigNumber**(`n`: number | string): *BigNumber*

*Defined in [DealerClient.ts:405](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L405)*

Turn a `string` or primitive `number` into a `BigNumber` for math reasons.

**`example`** 
```javascript
let bigNum = client.makeBigNumber("10") // use any BigNumber methods
bigNum = client.makeBigNumber(10)       // works with strings or numbers
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`n` | number &#124; string | the primitive number value to convert. |

**Returns:** *BigNumber*

The number as a `BigNumber` instance.

___

###  setAllowance

▸ **setAllowance**(`tokenTicker`: string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [DealerClient.ts:354](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L354)*

Set an unlimited proxy allowance for the 0x ERC20 Proxy contract for the
specified token ticker.

Only works with supported ERC20 tickers (see `client.tokens`).

**`example`** 
```javascript
try {
  // can take a long time, resolves after tx is mined
  await client.setAllowance("DAI");

  console.log("failed to set allowance");
} catch {
  console.log("allowance is set");
}
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tokenTicker` | string | The token's short ticker (ex. "ZRX", "DAI"). |

**Returns:** *Promise‹TransactionReceiptWithDecodedLogs›*

A promise that resolve when TX is mined, rejects if it fails.

___

###  supportedTickers

▸ **supportedTickers**(): *string[]*

*Defined in [DealerClient.ts:483](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L483)*

Return an array containing the list of supported token tickers.

**`example`** 
```javascript
client.supportedTickers() // > [ "DAI", "WETH", "ZRX ]
```

**Returns:** *string[]*

The supported token tickers.

___

###  toWei

▸ **toWei**(`etherAmount`: string): *string*

*Defined in [DealerClient.ts:447](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L447)*

Convert a number of tokens (full units, called "ether") to "wei", the
smallest denomination of most ERC-20 tokens with 18 decimals.

All contract calls require amounts in wei, but the user should be shown
amounts in ether. All values are strings to avoid precision issues.

**`example`** 
```javascript
client.toWei("10")  // > "10000000000000000000"
client.toWei("1") // > "1000000000000000000"
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`etherAmount` | string | The token amount to convert. |

**Returns:** *string*

The same amount in wei, string used for precision.

___

###  waitForTransactionSuccessOrThrow

▸ **waitForTransactionSuccessOrThrow**(`txId`: string): *Promise‹void›*

*Defined in [DealerClient.ts:388](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/e458263/src/DealerClient.ts#L388)*

Wait for a specific Ethereum transaction to be successfully mined.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`txId` | string | A valid Ethereum transaction ID to wait for. |

**Returns:** *Promise‹void›*

Resolves when mined successfully, rejects if the TX failed.