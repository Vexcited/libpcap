import { pcap_lib_version } from "~/libs/pcap/pcap_lib_version"

export const libpcapVersion = (): string => {
  return pcap_lib_version();
};
