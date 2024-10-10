import { cached } from "~/utils/initializers";
import type { SOCKET_ADDRESS_FAMILY } from "~/constants";
import { is_win32, UnsupportedOS } from "~/utils/os";
import koffi from "koffi";

export interface WindowsStructSockAddr {
  /** AF */
  sa_family: SOCKET_ADDRESS_FAMILY
  /** 14 bytes of protocol address */
  sa_data: string
}

export const init_windows_struct_sockaddr = (): void => {
  if (!is_win32) throw new UnsupportedOS();

  cached(init_windows_struct_sockaddr, () => {
    koffi.struct("sockaddr", {
      sa_family: "ushort",
      sa_data: "char [14]"
    });
  });
};
