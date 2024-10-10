import { pcap_open_live } from "~/libs/pcap/pcap_open_live";
import { make_ptr } from "~/utils/pointer";

/**
 *
 * @param deviceName Name of the device, use `findAllDevs` to get a list of devices
 * @param snaplen Maximum capture size (bytes) for each packet
 * @param promiscuous Whether to put the interface in promiscuous mode
 * @param timeout_ms Read timeout in milliseconds
 * @returns Capture handle
 */
export const openLive = (deviceName: string, snaplen: number, promiscuous: boolean, timeout_ms: number): void => {
  const errbuf = make_ptr("");
  const handle = pcap_open_live(deviceName, snaplen, promiscuous ? 1 : 0, timeout_ms, errbuf);

  /**
   * TODO: Handle potential error and display using errbuf.
   *
   * if (handle == NULL) {
   *   fprintf(stderr, "Could not open device %s: %s\n", device, errbuf);
   * }
   */
  console.log(handle);

  return handle;
};
