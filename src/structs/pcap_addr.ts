import { init_struct_sockaddr, type StructSockAddr } from "./sockaddr";
import koffi from "koffi";
import { init_struct_sockaddr_in } from "./sockaddr_in";
import { init_struct_sockaddr_in6 } from "./sockaddr_in6";
import type { ext } from "~/types/external";
let initialized = false;

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

export const init_struct_pcap_addr = (): void => {
  if (initialized) return;
  init_struct_sockaddr();
  init_struct_sockaddr_in();
  init_struct_sockaddr_in6();

  koffi.struct('pcap_addr', {
    next: 'pcap_addr *',
    addr: 'sockaddr *',
    netmask: 'sockaddr *',
    broadaddr: 'sockaddr *',
    dstaddr: 'sockaddr *'
  });

  initialized = true;
};
