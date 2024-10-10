import type { WindowsStructSockAddrIn } from "~/structs/sockaddr_in/windows";
import type { DarwinStructSockAddrIn } from "~/structs/sockaddr_in/darwin";

import { cached } from "~/utils/initializers";
import { os, UnsupportedOS } from "~/utils/os";

export type StructSockAddrIn = (
  | DarwinStructSockAddrIn
  | WindowsStructSockAddrIn
);

export const init_struct_sockaddr_in = async (): Promise<void> => {
  return cached(init_struct_sockaddr_in, async () => {
    switch (os) {
      case "win32": {
        const { init_windows_struct_sockaddr_in } = await import("./windows");
        init_windows_struct_sockaddr_in();
        break;
      }

      case "darwin": {
        const { init_darwin_struct_sockaddr_in } = await import ("./darwin");
        init_darwin_struct_sockaddr_in();
        break;
      }

      default:
        throw new UnsupportedOS();
    }
  });
};
