import type { ptr } from "~/utils/pointer";
import { cached } from "~/utils/initializers";

import { load_libpcap } from "~/libs/pcap/loader";
import { init_struct_pcap_if } from "~/structs/pcap_if";

export const pcap_findalldevs = async (alldevsp: ptr, errbuf: ptr): Promise<number> => {
  const findalldevs = await cached(pcap_findalldevs, async () => {
    const pcap = load_libpcap();
    await init_struct_pcap_if();

    return pcap.func("int pcap_findalldevs(_Out_ pcap_if **alldevsp, _Out_ char *errbuf)");
  });

  return findalldevs(alldevsp, errbuf);
};
