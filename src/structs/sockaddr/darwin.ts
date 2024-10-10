import { cached } from "~/utils/initializers";
import type { SOCKET_ADDRESS_FAMILY } from "~/constants";
import { is_darwin, os, UnsupportedOS } from "~/utils/os";
import koffi from "koffi";

export interface DarwinStructSockAddr {
  sa_len: number
  /** AF */
  sa_family: SOCKET_ADDRESS_FAMILY
  /** 14 bytes of protocol address */
  sa_data: string
}

export const init_darwin_struct_sockaddr = (): void => {
  if (!is_darwin) throw new UnsupportedOS();

  cached(init_darwin_struct_sockaddr, () => {
    koffi.struct("sockaddr", {
      sa_len: "uchar",
      sa_family: "uchar",
      sa_data: "char [14]"
    });
  });
};
