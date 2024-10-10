import type { StructPcapIf } from "~/structs/pcap_if";
import type { FoundDevice, PcapAddr } from "~/types/device";
import koffi from "koffi";
import { parse_pcap_addr } from "./pcap_addr";
import type { struct } from "~/types/external";

export const parse_pcap_if = async (pcap_if: StructPcapIf): Promise<FoundDevice> => {
  const addresses: Array<PcapAddr> = [];

  if (pcap_if.addresses) {
    for (let address = pcap_if.addresses;;) {
      const pcap_addr: struct<typeof address> = koffi.decode(address, "pcap_addr");
      addresses.push(await parse_pcap_addr(pcap_addr));

      // Iterate to the next address if not null.
      if (!pcap_addr.next) break;
      address = pcap_addr.next;
    }
  }

  return {
    name: pcap_if.name,
    description: pcap_if.description,
    flags: pcap_if.flags,
    addresses
  };
};
