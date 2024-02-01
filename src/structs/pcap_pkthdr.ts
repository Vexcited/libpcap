import koffi from "koffi";
import { init_windows_struct_timeval } from "./windows_timeval";
let initialized = false;

/** @see https://github.com/the-tcpdump-group/libpcap/blob/master/pcap/pcap.h#L302 */
export const init_struct_pcap_pkthdr = (): void => {
  if (initialized) return;

  if (process.platform === "win32")
    init_windows_struct_timeval();
  else throw new Error("Cannot use pcap_pkthdr on this platform, timeval struct not supported.");

  koffi.struct("pcap_pkthdr", {
    ts: "timeval",
    caplen: process.platform === "win32" ? "unsigned long" : "uint",
    len: process.platform === "win32" ? "unsigned long" : "uint"
  });

  initialized = true;
}