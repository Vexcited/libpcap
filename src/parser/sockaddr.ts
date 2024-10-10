import { init_struct_sockaddr, type StructSockAddr } from "~/structs/sockaddr";
import type { ext, struct } from "~/types/external";

import koffi from "koffi";
import { SOCKET_ADDRESS_FAMILY } from "~/constants";
import { type StructSockAddrIn, init_struct_sockaddr_in } from "~/structs/sockaddr_in";
import { type StructSockAddrIn6, init_struct_sockaddr_in6 } from "~/structs/sockaddr_in6";
import { inet_ntop } from "~/libs/inet_ntop";
import { make_ptr } from "~/utils/pointer";

export const parse_external_sockaddr = async (external_sockaddr: ext<StructSockAddr>): Promise<string | null> => {
  await init_struct_sockaddr();
  const base_addr: struct<typeof external_sockaddr> = koffi.decode(external_sockaddr, "sockaddr");

  switch (base_addr.sa_family) {
    case SOCKET_ADDRESS_FAMILY.AF_INET: {
      await init_struct_sockaddr_in();
      const addr: StructSockAddrIn = koffi.decode(external_sockaddr, "sockaddr_in");
      return inet_ntop(addr.sin_family, koffi.as(addr.sin_addr, "in_addr *"), make_ptr(""), 16);
    }

    case SOCKET_ADDRESS_FAMILY.AF_INET6: {
      await init_struct_sockaddr_in6();
      const addr: StructSockAddrIn6 = koffi.decode(external_sockaddr, "sockaddr_in6");
      return inet_ntop(addr.sin6_family, koffi.as(addr.sin6_addr, "in6_addr *"), make_ptr(""), 46);
    }

    default: return null;
  }
};
