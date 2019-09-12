_This repository is a mirror for the public client package from the Zaidan monorepo._

# Zaidan dealer client

A simple browser client for the Zaidan dealer system, leveraging 0x and ZEIP-18 based fills.

Includes helpful utilities for viewing ERC-20 balances, and setting 0x asset proxy allowances.

View [the documentation for full API reference.](./docs/classes/dealerclient.md)

## Usage

The `DealerClient` can be used in supported Web3 browsers (depends on a `window.ethereum` provider) or in server environments with an unlocked node, by passing an Ethereum JSONRPC URI as the second parameter to the constructor.

Eventually, other signing providers may be supported, such as hardware wallets or a mnemonic.

### Import into project
TypeScript/ES6:
```ts
import { DealerClient } from "@zaidan/dealer-client";
```

CommonJS:
```js
const { DealerClient } = require("@zaidan/dealer-client");
```

Browser (using provided WebPack config):
```js
const { DealerClient } = window.Zaidan;
```

### Initialize
Pass the `DealerClient` constructor a full URL to a Zaidan dealer RPC server.
```typescript
(async () => {
  const dealer = new DealerClient("https://dealer.zaidan.io/");

  // must be initialized before use, will prompt user to connect wallet
  await dealer.init();
})();
```

### Get and fill quotes
Request a price quote and fillable order from the dealer server:
```typescript
// other fields available in response (price, fee, etc.), see documentation
const { id, order } = await dealer.getQuote(4.24, "WETH/DAI", "bid");

// will prompt for signature and request the trade be settled by the dealer
const txId = await dealer.handleTrade(order, id);
```

See [the `./docs` folder](./docs) for more.
