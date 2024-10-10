import { load_libpcap } from "~/libs/pcap/loader";
import { cached } from "~/utils/initializers";

export const pcap_lib_version = (): string => {
  return cached(pcap_lib_version, () => {
    const pcap = load_libpcap();
    return pcap.func("const char *pcap_lib_version(void)");
  })();
};
