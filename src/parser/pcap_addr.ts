import type { StructPcapAddr } from "~/structs/pcap_addr";
import type { PcapAddr } from "~/types/device";
import { parse_external_sockaddr } from "./sockaddr";

export const parse_pcap_addr = (pcap_addr: StructPcapAddr): PcapAddr => {
  const addr = parse_external_sockaddr(pcap_addr.addr);
    
  let netmask: string | null;
  if (pcap_addr.netmask) {
    netmask = parse_external_sockaddr(pcap_addr.netmask);
  } else netmask = null;

  let broadaddr: string | null;
  if (pcap_addr.broadaddr) {
    broadaddr = parse_external_sockaddr(pcap_addr.broadaddr);
  } else broadaddr = null;

  let dstaddr: string | null;
  if (pcap_addr.dstaddr) {
    dstaddr = parse_external_sockaddr(pcap_addr.dstaddr);
  } else dstaddr = null;

  return {
    addr,
    netmask,
    broadaddr,
    dstaddr
  }
};
