import type { SOCKET_ADDRESS_FAMILY } from "~/constants";
import { type WindowsStructIn6Addr, init_windows_struct_in6_addr } from "./windows_in6_addr";
import koffi from "koffi";
import type { ext } from "~/types/external";
let initialized = false;

export interface StructSockAddrIn6 {
  /** Address family, AF_INET6 */
  sin6_family: SOCKET_ADDRESS_FAMILY
  /** Port number, Network Byte Order  */
  sin6_port: number
  /** IPv6 flow information */
  sin6_flowinfo: number
  /** IPv6 address */
  sin6_addr: ext<WindowsStructIn6Addr>
  /** Scope ID */
  sin6_scope_id: number
}

export const init_struct_sockaddr_in6 = () => {
  if (initialized) return;

  // Make sure the `in6_addr` structure was initialized.
  if (process.platform === "win32") {
    init_windows_struct_in6_addr();
  } else throw new Error("Platform not supported.");

  koffi.struct("sockaddr_in6", {
    sin6_family: "uint16_t",
    sin6_port: "uint16_t",
    sin6_flowinfo: "uint32_t",
    sin6_addr: "in6_addr",
    sin6_scope_id: "uint32_t"
  });
  
  initialized = true;
};
