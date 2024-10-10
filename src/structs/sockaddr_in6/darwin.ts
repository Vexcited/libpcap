import type { ext } from "~/types/external";
import koffi from "koffi";
import { cached } from "~/utils/initializers";
import { type PosixStructIn6Addr, init_posix_struct_in6_addr } from "~/structs/in6_addr/posix";
import { is_darwin, UnsupportedOS } from "~/utils/os";

export interface DarwinStructSockAddrIn6 {
  sin6_len: number
  sin6_family: number
  sin6_port: number
  sin6_flowinfo: number
  sin6_addr: ext<PosixStructIn6Addr>
  sin6_scope_id: number
}

/**
 * @see https://opensource.apple.com/source/xnu/xnu-4570.1.46/bsd/netinet6/in6.h
 * @see https://opensource.apple.com/source/xnu/xnu-4570.1.46/bsd/sys/_types/_sa_family_t.h
 * @see https://opensource.apple.com/source/xnu/xnu-4570.1.46/bsd/sys/_types/_in_port_t.h
 */
export const init_darwin_struct_sockaddr_in6 = (): void => {
  if (!is_darwin) throw new UnsupportedOS();

  cached(init_darwin_struct_sockaddr_in6, () => {
    init_posix_struct_in6_addr();

    koffi.struct("sockaddr_in6", {
      /* __uint8_t   */ sin6_len:      "uint8_t",  // length of this struct(sa_family_t)
      /* sa_family_t */ sin6_family:   "uint8_t",   // AF_INET6 (sa_family_t)
      /* in_port_t   */ sin6_port:     "uint16_t", // Transport layer port # (in_port_t)
      /* __uint32_t  */ sin6_flowinfo: "uint32_t", // IP6 flow information
      /* in6_addr    */ sin6_addr:     "in6_addr", // IP6 address
      /* __uint32_t  */ sin6_scope_id: "uint32_t"  // scope zone index
    });
  });
};
