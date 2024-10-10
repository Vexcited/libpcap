# `libpcap-ffi` - [`libpcap`](https://github.com/the-tcpdump-group/libpcap) FFI wrapper for Node.js

> **Note:** This project is still in development.

Only supports Windows, for now. I'm currently working on macOS support.

This project was made possible thanks to [`koffi`](https://koffi.dev/), an awesome and fast C FFI module for Node.js.

Since `koffi` is made for Node.js, compatibility with Bun or Deno is not guaranteed but could be possible.

## Prerequisites

### Windows

You'll need to install [Npcap](https://npcap.com/#download).

Check that you have the `wpcap.dll` file at `C:\Windows\System32\Npcap\wpcap.dll` - should be the default location.

Note that `libpcap-ffi` may not be compatible with [WinPcap](https://www.winpcap.org/)
so if you had WinPcap installed before, you'll need to uninstall it or
find a way to use the `wpcap.dll` from Npcap instead of the one from WinPcap.

### macOS

You need to have `libpcap.dylib` installed on your system.

It's apparently already installed on macOS, but if it's not, you can install it using Homebrew:

```sh
brew install libpcap
``` 

### Linux

You need to have `libpcap.so` installed on your system.

## Usage

Every functions can be directly imported from `libpcap-ffi`, so if you want to use `findAllDevs`, you can simply do:

```js
// ESM
import { findAllDevs } from "libpcap-ffi";
// CJS
const { findAllDevs } = require("libpcap-ffi");

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
| `pnpm install` | Install the dependencies |
| `pnpm build` | Bundle `src` directory into `dist` |

### Run examples

You should install globally [`tsx`](https://www.npmjs.com/package/tsx).
  
```sh
npm i -g tsx
# now you can run the examples
tsx ./examples/devices.ts
```

### TO-DO

A list of things to do to make the library more complete.

- [x] Remove `next` attribute on `Device` objects.
- [x] Parse `addresses` attribute on `Device` objects.
  - [x] Make an interface for the `addresses` attribute.
  - [x] Read them as an array of object.
  - [x] Make a function to parse those.
- [ ] OpenLive
- [ ] OpenOffline

## Resources

- <https://beej.us/guide/bgnet/pdf/bgnet_a4_c_2.pdf>
- <https://www.tcpdump.org/manpages>
