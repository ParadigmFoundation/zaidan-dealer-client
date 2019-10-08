[Zaidan dealer client](README.md) › [Globals](globals.md)

# Zaidan dealer client

_This repository is a mirror for the public client package from the Zaidan monorepo._

# Zaidan dealer client

A simple browser client for the Zaidan dealer system, leveraging 0x and ZEIP-18 based fills.

Includes helpful utilities for viewing ERC-20 balances, and setting 0x asset proxy allowances.

View [the documentation for full API reference.](./docs/classes/dealerclient.md)

## Usage

The `DealerClient` supports Web3 browsers that expose a `window.ethereum` provider, and can also be used in server environments by passing an Ethereum JSONRPC URL as the second parameter to the constructor.

In the future, it will support additional provider types, such as hardware wallets and mnemonics.

### Import into project
TypeScript/ES6:
```ts
import { DealerClient } from "zaidan-dealer-client";
```

CommonJS:
```js
const { DealerClient } = require("zaidan-dealer-client");
```

Browser (using provided WebPack config):
```js
const { DealerClient } = window.Zaidan;
```

### Initialize
Pass the `DealerClient` constructor a full URL to a Zaidan dealer RPC server.

## Client-side (browser)
```typescript
(async () => {
  const dealer = new DealerClient("https://dealer.zaidan.io/");

  // must be initialized before use, will prompt user to connect wallet
  await dealer.init();
})();
```

## Server-side (unlocked node)
```typescript
(async () => {
  const dealer = new DealerClient("https://dealer.zaidan.io/", "http://localhost:8545");

  // must be initialized before use, will prompt user to connect wallet
  await dealer.init();
})();
```

### Get and fill quotes

There are two ways to get price quotes for supported markets from a configured dealer.

A [currency pair](https://en.wikipedia.org/wiki/Currency_pair) can be provided as well as a side ("bid" or "ask") to retrieve a quote for that market using the base and quote asset of the currency pair. This provides a more conventional trading interface.

For convenience, an alternate "swap" functionality can be used which allows the client to directly specify the maker and taker asset, by indicating their desired taker quantity to retrieve a price quote and signed order from the dealer for a corresponding amount of the maker asset. This interface is popular for many contract-based decentralized exchanges.

#### Currency pair quote
Use the method below to request a bid or ask quote from a supported market provided by a dealer, where the size is in units of the base asset.

```typescript
// other fields available in response (price, fee, etc.), see documentation
const { id, order, price } = await dealer.getQuote(4.24, "WETH/DAI", "bid");
```

#### Swap quote

Conceptually, the `getSwapQuote` call below can be interpreted as the client requesting to swap 3.5 WETH for an equivalent amount of DAI, according to a price quote from the dealer.

```typescript
// other fields available in response (price, fee, etc.), see documentation
const { id, order, price } = await dealer.getSwapQuote(3.5, "WETH", "DAI");
```

#### Request for fill
If the client wishes to execute the quote (within the bounds of it's expiration), they can sign the order according to ZEIP-18 and request for the dealer to execute the fill.

```typescript
// load `order` and `id` as described above
// will prompt for signature and request the trade be settled by the dealer
const txId = await dealer.handleTrade(order, id);
```

See [the `./docs` folder](./docs) for more.

## Development

Additional development scripts can be found in [`package.json`](./package.json) (docs site, etc.).

### Build

Compile TypeScript source:

```
yarn build
```

### Test

Run spec tests (requires docker-compose for 0x snapshot):

```
yarn test
```

Run with alternate Ethereum JSONRPC (see `tests/` for more configuration):

```shell
# default shown
WEB3_URL=http://localhost:8545 yarn test
```

### Generate documentation

Build documentation from TypeScript comments using `tsdoc` (ouput to `docs/`):

```
yarn docs
```

### Build docs site

Generate the vuepress site (output to `docs/.vuepress/dist`):

```
yarn docs:build
```
