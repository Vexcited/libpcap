import type { ext } from "~/types/external";
import koffi from "koffi";
import { cached } from "~/utils/initializers";
import { type WindowsStructIn6Addr, init_windows_struct_in6_addr } from "~/structs/in6_addr/windows";
import { is_win32, UnsupportedOS } from "~/utils/os";

export interface WindowsStructSockAddrIn6 {
  sin6_family: number
  /** Port number, Network Byte Order  */
  sin6_port: number
  /** IPv6 flow information */
  sin6_flowinfo: number
  /** IPv6 address */
  sin6_addr: ext<WindowsStructIn6Addr>
  /** Scope ID */
  sin6_scope_id: number
}

export const init_windows_struct_sockaddr_in6 = (): void => {
  if (!is_win32) throw new UnsupportedOS();

  cached(init_windows_struct_sockaddr_in6, () => {
    init_windows_struct_in6_addr();

    koffi.struct("sockaddr_in6", {
      sin6_family: "uint16_t",
      sin6_port: "uint16_t",
      sin6_flowinfo: "uint32_t",
      sin6_addr: "in6_addr",
      sin6_scope_id: "uint32_t"
    });
  });
};
