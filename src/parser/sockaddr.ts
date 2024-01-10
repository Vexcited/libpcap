import type { StructSockAddr } from "~/structs/sockaddr";
import type { ext, struct } from "~/types/external";

import koffi from "koffi";
import { SOCKET_ADDRESS_FAMILY } from "~/constants";
import { type StructSockAddrIn, init_struct_sockaddr_in } from "~/structs/sockaddr_in";
import { type StructSockAddrIn6, init_struct_sockaddr_in6 } from "~/structs/sockaddr_in6";
import { inet_ntop } from "~/libs/ws2_32/inet_ntop";

export const parse_external_sockaddr = (external_sockaddr: ext<StructSockAddr>): string | null => {
  // First decode it as "sockaddr" to read `sa_family`.
  const base_addr: struct<typeof external_sockaddr> = koffi.decode(external_sockaddr, 'sockaddr');

  if (base_addr.sa_family === SOCKET_ADDRESS_FAMILY.AF_INET) {
    init_struct_sockaddr_in();
    const addr: StructSockAddrIn = koffi.decode(external_sockaddr, "sockaddr_in");
    return inet_ntop(addr.sin_family, koffi.as(addr.sin_addr, "in_addr *"), [""], 16);
  }
  else if (base_addr.sa_family === SOCKET_ADDRESS_FAMILY.AF_INET6) {
    init_struct_sockaddr_in6();
    const addr: StructSockAddrIn6 = koffi.decode(external_sockaddr, "sockaddr_in6");
    return inet_ntop(addr.sin6_family, koffi.as(addr.sin6_addr, "in6_addr *"), [""], 46);
  }

  return null;
}