# libpcap - `wpcap.dll` wrapper for Node.js

> **Note:** This project is still in development. It is not ready for production use.

**Only supports Windows**, for now. Contributions are welcome.

This project was made possible thanks to [`koffi`](https://koffi.dev/), an awesome and fast C FFI module for Node.js.

## Prerequisites

You'll need to install [Npcap](https://npcap.com/#download).

Check that you have the `wpcap.dll` file at `C:\Windows\System32\Npcap\wpcap.dll` - should be the default location.

If you had WinPcap installed before, you'll need to uninstall it or
find a way to use the `wpcap.dll` from Npcap instead of the one from WinPcap.

## Usage

```js
// Or with CJS : const { findAllDevs } = require("libpcap");
import { findAllDevs } from "libpcap";

const devices = findAllDevs();
console.log(devices);
/** >>> Returns the following array:
 * [
 *   {
 *     name: '\\Device\\...',
 *     description: '...',
 *     addresses: [ ... ],
 *     flags: 22
 *   },
 *   ...
 * ]
 */
```

## API

### Overview

- [`Device`](#device)
- [`findAllDevs()`](#findalldevs-device)

### `Device`

```ts
interface Device {
  name: string;
  description: string;
  addresses: any[]; // TODO: Make an interface for this.
  flags: number;
}
```

### `findAllDevs(): Device[]`

Returns an array of `Device` objects.

## Contributing

### Commands

Note that we use `pnpm` to manage dependencies.

| Command | Description |
| ------- | ----------- |
| `pnpm install` | Install the dependencies. |
| `pnpm build` | Bundle `src` directory into `dist` using [`tsup`](https://github.com/egoist/tsup). |
| `pnpm build --onSuccess 'node examples/devices.js'` | Run an example script after a successful build. |

### TO-DO

A list of things to do to make the library more complete.

- [x] Remove `next` attribute on `Device` objects.
- [ ] Parse `addresses` attribute on `Device` objects.
  - [ ] Make an interface for the `addresses` attribute.
  - [x] Read them as an array of object.
  - [x] Make a function to parse those.
