import koffi from "koffi";
import { cached } from "~/utils/initializers";
import { is_posix, UnsupportedOS } from "~/utils/os";

export interface PosixStructInAddr {
  s_addr: number
}

/**
 * Concerning `linux`
 * @see https://man7.org/linux/man-pages/man7/ip.7.html
 *
 * Concerning `darwin`
 * @see https://opensource.apple.com/source/xnu/xnu-4570.1.46/bsd/netinet/in.h
 * @see https://opensource.apple.com/source/xnu/xnu-4570.1.46/bsd/sys/_types/_in_addr_t.h
 */
export const init_posix_struct_in_addr = (): void => {
  if (!is_posix) throw new UnsupportedOS();

  cached(init_posix_struct_in_addr, () => {
    koffi.struct("in_addr", {
      /* in_addr_t */ s_addr: "uint32_t" // address in network byte order
    });
  });
};
