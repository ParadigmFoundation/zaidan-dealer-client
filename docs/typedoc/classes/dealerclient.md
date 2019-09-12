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
* [apiBase](dealerclient.md#private-apibase)
* [coinbase](dealerclient.md#coinbase)
* [contractWrappers](dealerclient.md#contractwrappers)
* [dealerUrl](dealerclient.md#private-dealerurl)
* [initialized](dealerclient.md#initialized)
* [isBrowser](dealerclient.md#isbrowser)
* [networkId](dealerclient.md#networkid)
* [pairs](dealerclient.md#pairs)
* [subProvider](dealerclient.md#subprovider)
* [tokens](dealerclient.md#tokens)
* [web3](dealerclient.md#web3)
* [web3Url](dealerclient.md#private-web3url)
* [web3Wrapper](dealerclient.md#web3wrapper)
* [MAX_ALLOWANCE](dealerclient.md#static-max_allowance)

### Methods

* [_call](dealerclient.md#private-_call)
* [_connectMetamask](dealerclient.md#private-_connectmetamask)
* [_getAddress](dealerclient.md#private-_getaddress)
* [_loadAssets](dealerclient.md#private-_loadassets)
* [_loadMarkets](dealerclient.md#private-_loadmarkets)
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

*Defined in [index.ts:69](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L69)*

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

*Defined in [index.ts:69](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L69)*

Default gas price to use for allowance transactions.

___

### `Private` apiBase

• **apiBase**: *string*

*Defined in [index.ts:32](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L32)*

Base API path for the dealer server.

___

###  coinbase

• **coinbase**: *string*

*Defined in [index.ts:57](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L57)*

Stores the current user's coinbase address.

___

###  contractWrappers

• **contractWrappers**: *ContractWrappers*

*Defined in [index.ts:60](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L60)*

Initialized contract wrappers for interacting with the 0x system.

___

### `Private` dealerUrl

• **dealerUrl**: *URL*

*Defined in [index.ts:26](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L26)*

Dealer server RPC server URL.

___

###  initialized

• **initialized**: *boolean*

*Defined in [index.ts:63](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L63)*

Set to 'true' after a successful .init(), must be called before use.

___

###  isBrowser

• **isBrowser**: *boolean*

*Defined in [index.ts:66](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L66)*

Set to 'true' if browser environment is detected.

___

###  networkId

• **networkId**: *number*

*Defined in [index.ts:54](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L54)*

Stores the configured Ethereum network ID.

___

###  pairs

• **pairs**: *string[]*

*Defined in [index.ts:37](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L37)*

An array of the currently supported pairs (as expected by `getQuote`).

___

###  subProvider

• **subProvider**: *MetamaskSubprovider*

*Defined in [index.ts:51](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L51)*

SubProvider instance used to interact with MetaMask.

___

###  tokens

• **tokens**: *object*

*Defined in [index.ts:42](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L42)*

Maps tokenTicker => address for looking up common tokens.

#### Type declaration:

* \[ **ticker**: *string*\]: string

___

###  web3

• **web3**: *Web3*

*Defined in [index.ts:45](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L45)*

Main Web3 instance for interacting with Ethereum.

___

### `Private` web3Url

• **web3Url**: *URL*

*Defined in [index.ts:29](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L29)*

Stores the Ethereum JSONRPC provider URL for server-side usage.

___

###  web3Wrapper

• **web3Wrapper**: *Web3Wrapper*

*Defined in [index.ts:48](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L48)*

Provides additional convenience methods for interacting with web3.

___

### `Static` MAX_ALLOWANCE

▪ **MAX_ALLOWANCE**: *BigNumber* =  new BigNumber(2).exponentiatedBy(256).minus(1)

*Defined in [index.ts:23](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L23)*

2^256 - 1 represents an effectively "unlimited" allowance

## Methods

### `Private` _call

▸ **_call**(`endpoint`: string, `method`: "GET" | "POST", `data?`: any): *Promise‹any›*

*Defined in [index.ts:563](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L563)*

**Parameters:**

Name | Type |
------ | ------ |
`endpoint` | string |
`method` | "GET" &#124; "POST" |
`data?` | any |

**Returns:** *Promise‹any›*

___

### `Private` _connectMetamask

▸ **_connectMetamask**(): *Promise‹void›*

*Defined in [index.ts:546](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L546)*

**Returns:** *Promise‹void›*

___

### `Private` _getAddress

▸ **_getAddress**(`ticker`: string): *string*

*Defined in [index.ts:578](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L578)*

**Parameters:**

Name | Type |
------ | ------ |
`ticker` | string |

**Returns:** *string*

___

### `Private` _loadAssets

▸ **_loadAssets**(): *Promise‹any›*

*Defined in [index.ts:590](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L590)*

**Returns:** *Promise‹any›*

___

### `Private` _loadMarkets

▸ **_loadMarkets**(): *Promise‹string[]›*

*Defined in [index.ts:586](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L586)*

**Returns:** *Promise‹string[]›*

___

###  fromWei

▸ **fromWei**(`weiAmount`: string): *string*

*Defined in [index.ts:467](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L467)*

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

*Defined in [index.ts:406](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L406)*

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

*Defined in [index.ts:505](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L505)*

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

*Defined in [index.ts:174](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L174)*

Request orders from the Dealer server to sign. The response object
contains a bid and ask order, both signed by the dealer server as the
maker.

One of these outputted orders can be passed to `client.handleTrade()`
which will prompt the user to sign the order, and send it back to the
server so it may be executed.

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
`size` | number | the amount of tokens the user is selling |
`symbol` | string | the token pair the swap is for (ex: "WETH/DAI") |
`side` | string | either 'bid' or 'ask' depending on side |

**Returns:** *Promise‹[DealerResponse](../interfaces/dealerresponse.md)›*

a price quote and signed maker order from the dealer server

___

###  getSwapQuote

▸ **getSwapQuote**(`size`: number, `clientAsset`: string, `dealerAsset`: string): *Promise‹[DealerResponse](../interfaces/dealerresponse.md)›*

*Defined in [index.ts:224](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L224)*

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

*Defined in [index.ts:280](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L280)*

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

*Defined in [index.ts:339](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L339)*

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

*Defined in [index.ts:113](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L113)*

Initialize a DealerClient instance. A call to `client.init()` will trigger
a MetaMask pop-up prompting the user to sign in, or allow the site access.

If the user has already allowed site access, the prompt will be skipped.

**Returns:** *Promise‹void›*

A promise that resolves when initialization is complete.

___

###  makeBigNumber

▸ **makeBigNumber**(`_number`: number | string): *BigNumber*

*Defined in [index.ts:442](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L442)*

Turn a `string` or primitive `number` into a `BigNumber` for math reasons.

**`example`** 
```javascript
let bigNum = client.makeBigNumber("10") // use any BigNumber methods
bigNum = client.makeBigNumber(10)       // works with strings or numbers
```

**Parameters:**

Name | Type |
------ | ------ |
`_number` | number &#124; string |

**Returns:** *BigNumber*

The number as a `BigNumber` instance.

___

###  setAllowance

▸ **setAllowance**(`tokenTicker`: string): *Promise‹TransactionReceiptWithDecodedLogs›*

*Defined in [index.ts:378](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L378)*

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

*Defined in [index.ts:542](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L542)*

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

*Defined in [index.ts:490](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L490)*

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

*Defined in [index.ts:423](https://github.com/ParadigmFoundation/zaidan-dealer-client/blob/bbd5892/src/index.ts#L423)*

Wait for a specific Ethereum transaction to be successfully mined.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`txId` | string | A valid Ethereum transaction ID to wait for. |

**Returns:** *Promise‹void›*

Resolves when mined successfully, rejects if the TX failed.