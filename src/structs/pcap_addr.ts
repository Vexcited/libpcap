import { init_struct_sockaddr, type StructSockAddr } from "~/structs/sockaddr";
import { cached } from "~/utils/initializers";
import type { ext } from "~/types/external";
import koffi from "koffi";

export interface StructPcapAddr {
  next: ext<StructPcapAddr> | null
  /** Address */
  addr: ext<StructSockAddr>
  /** Netmask for that address */
  netmask: ext<StructSockAddr> | null
  /** Broadcast address for that address */
  broadaddr: ext<StructSockAddr> | null
  /** P2P destination address for that address */
  dstaddr: ext<StructSockAddr> | null
}

export const init_struct_pcap_addr = async (): Promise<void> => {
  return cached(init_struct_pcap_addr, async () => {
    await init_struct_sockaddr();

    koffi.struct("pcap_addr", {
      next: "pcap_addr *",
      addr: "sockaddr *",
      netmask: "sockaddr *",
      broadaddr: "sockaddr *",
      dstaddr: "sockaddr *"
    });
  });
};
