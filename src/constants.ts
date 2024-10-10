import { variants } from "./utils/os";


/**
 * 
 * @see https://opensource.apple.com/source/xnu/xnu-201/bsd/sys/socket.h.auto.html
 * @see https://github.com/torvalds/linux/blob/master/include/linux/socket.h
 * @see https://github.com/openbsd/src/blob/master/sys/sys/socket.h
 */
export const SOCKET_ADDRESS_FAMILY = {
  /** Unspecified */
  AF_UNSPEC: 0,
  /** Internetwork: UDP, TCP, etc. */
  AF_INET: 2,
  /** Internetwork Version 6 */
  AF_INET6: variants(
    23,
    30,
    10,
    24
  ),

  AF_LINK: 18
} as const;

export type SOCKET_ADDRESS_FAMILY = typeof SOCKET_ADDRESS_FAMILY[keyof typeof SOCKET_ADDRESS_FAMILY]
