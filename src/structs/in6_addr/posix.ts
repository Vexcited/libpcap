import koffi from "koffi";
import { cached } from "~/utils/initializers";
import { is_posix, UnsupportedOS } from "~/utils/os";

export interface PosixStructIn6Addr {
  s6_addr: Array<number>
}

/**
 * Concerning `linux`
 * @see https://man7.org/linux/man-pages/man7/ipv6.7.html
 *
 * Concerning `darwin`
 * @see https://opensource.apple.com/source/xnu/xnu-4570.1.46/bsd/netinet6/in6.h
 */
export const init_posix_struct_in6_addr = (): void => {
  if (!is_posix) throw new UnsupportedOS();

  cached(init_posix_struct_in6_addr, () => {
    koffi.struct("in6_addr", {
      s6_addr: "uchar [16]"
    });
  });
};
