import type { StructPcapAddr } from "~/structs/pcap_addr";
import type { PcapAddr } from "~/types/device";
import { parse_external_sockaddr } from "./sockaddr";

export const parse_pcap_addr = async (pcap_addr: StructPcapAddr): Promise<PcapAddr> => {
  const addr = await parse_external_sockaddr(pcap_addr.addr);

  let netmask: string | null;
  if (pcap_addr.netmask) {
    netmask = await parse_external_sockaddr(pcap_addr.netmask);
  }
  else netmask = null;

  let broadaddr: string | null;
  if (pcap_addr.broadaddr) {
    broadaddr = await parse_external_sockaddr(pcap_addr.broadaddr);
  }
  else broadaddr = null;

  let dstaddr: string | null;
  if (pcap_addr.dstaddr) {
    dstaddr = await parse_external_sockaddr(pcap_addr.dstaddr);
  }
  else dstaddr = null;

  return {
    addr,
    netmask,
    broadaddr,
    dstaddr
  };
};
