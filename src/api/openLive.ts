import { pcap_open_live } from "~/libs/pcap/pcap_open_live"
import { make_ptr } from "~/utils/pointer";

/**
 * 
 * @param deviceName name of the device
 * @param snaplen maximum size to read for each packet
 * @param promiscuous whether to put the interface in promiscuous mode
 * @param timeout 
 */
export const openLive = (deviceName: string, snaplen: number, promiscuous: boolean, timeout: number) => {
  const errbuf = make_ptr("");

  pcap_open_live(deviceName, snaplen, promiscuous ? 1 : 0, timeout, errbuf);
}