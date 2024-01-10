# libpcap - `wpcap.dll` wrapper for Node.js

> **Note:** This project is still in development.

**Only supports Windows**, for now. Contributions are welcome.

This project was made possible thanks to [`koffi`](https://koffi.dev/), an awesome and fast C FFI module for Node.js.

## Prerequisites

You'll need to install [Npcap](https://npcap.com/#download).

Check that you have the `wpcap.dll` file at `C:\Windows\System32\Npcap\wpcap.dll` - should be the default location.

If you had WinPcap installed before, you'll need to uninstall it or
find a way to use the `wpcap.dll` from Npcap instead of the one from WinPcap.

## Usage

Every functions can be directly imported from `libpcap`, so if you want to use `findAllDevs`, you can simply do:

```js
// ESM
import { findAllDevs } from "libpcap";
// CJS
const { findAllDevs } = require("libpcap");

// Just use it !
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
- [x] Parse `addresses` attribute on `Device` objects.
  - [x] Make an interface for the `addresses` attribute.
  - [x] Read them as an array of object.
  - [x] Make a function to parse those.

## Resources

- <https://beej.us/guide/bgnet/pdf/bgnet_a4_c_2.pdf>
- <https://www.tcpdump.org/manpages>
