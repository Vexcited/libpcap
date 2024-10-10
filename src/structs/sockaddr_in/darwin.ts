import type { ext } from "~/types/external";
import koffi from "koffi";
import { cached } from "~/utils/initializers";
import { type PosixStructInAddr, init_posix_struct_in_addr } from "~/structs/in_addr/posix";
import { is_darwin, UnsupportedOS } from "~/utils/os";

export interface DarwinStructSockAddrIn {
  sin_len: number
  sin_family: number
  sin_port: number
  sin_addr: ext<PosixStructInAddr>
  sin_zero: string
}

/**
 * @see https://opensource.apple.com/source/xnu/xnu-4570.1.46/bsd/netinet/in.h
 * @see https://opensource.apple.com/source/xnu/xnu-4570.1.46/bsd/sys/_types/_sa_family_t.h
 * @see https://opensource.apple.com/source/xnu/xnu-4570.1.46/bsd/sys/_types/_in_port_t.h
 */
export const init_darwin_struct_sockaddr_in = (): void => {
  if (!is_darwin) throw new UnsupportedOS();

  cached(init_darwin_struct_sockaddr_in, () => {
    init_posix_struct_in_addr();

    koffi.struct("sockaddr_in", {
      /* __uint8_t   */ sin_len:    "uint8_t",
      /* sa_family_t */ sin_family: "uint8_t",
      /* in_port_t   */ sin_port:   "uint16_t",
      /* in_addr     */ sin_addr:   "in_addr",
      /* char[8]     */ sin_zero:   "char [8]"
    });
  });
};
