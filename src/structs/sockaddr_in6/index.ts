import type { WindowsStructSockAddrIn6 } from "~/structs/sockaddr_in6/windows";
import type { DarwinStructSockAddrIn6 } from "~/structs/sockaddr_in6/darwin";

import { cached } from "~/utils/initializers";
import { os, UnsupportedOS } from "~/utils/os";

export type StructSockAddrIn6 = (
  | DarwinStructSockAddrIn6
  | WindowsStructSockAddrIn6
);

export const init_struct_sockaddr_in6 = async (): Promise<void> => {
  return cached(init_struct_sockaddr_in6, async () => {
    switch (os) {
      case "win32": {
        const { init_windows_struct_sockaddr_in6 } = await import("./windows");
        init_windows_struct_sockaddr_in6();
        break;
      }

      case "darwin": {
        const { init_darwin_struct_sockaddr_in6 } = await import ("./darwin");
        init_darwin_struct_sockaddr_in6();
        break;
      }

      default:
        throw new UnsupportedOS();
    }
  });
};
