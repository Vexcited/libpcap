import type { WindowsStructSockAddr } from "~/structs/sockaddr/windows";
import type { DarwinStructSockAddr } from "~/structs/sockaddr/darwin";

import { os, UnsupportedOS } from "~/utils/os";
import { cached } from "~/utils/initializers";

export type StructSockAddr = (
  | DarwinStructSockAddr
  | WindowsStructSockAddr
);

export const init_struct_sockaddr = async (): Promise<void> => {
  return cached(init_struct_sockaddr, async () => {
    switch (os) {
      case "win32": {
        const { init_windows_struct_sockaddr } = await import("./windows");
        init_windows_struct_sockaddr();
        break;
      }

      case "darwin": {
        const { init_darwin_struct_sockaddr } = await import ("./darwin");
        init_darwin_struct_sockaddr();
        break;
      }

      default:
        throw new UnsupportedOS();
    }
  });
};
