import type { FoundDevice } from "~/types/device";
import { type StructPcapIf, init_struct_pcap_if } from "~/structs/pcap_if";
import { pcap_findalldevs } from "~/libs/pcap/pcap_findalldevs";
import { parse_pcap_if } from "~/parser/pcap_if";

import { make_ptr, read_ptr } from "~/utils/pointer";
import koffi from "koffi";

export const findAllDevs = (): Array<FoundDevice> => {
  const error_buffer = make_ptr("");
  const devices_ptr = make_ptr(null);

  if (pcap_findalldevs(devices_ptr, error_buffer) !== 0) { // Handle potential error.
    throw new Error(`pcap_findalldevs: returned value different from 0.\nerror_buffer: ${read_ptr(error_buffer) || "(empty)"}`);
  }
  
  const devices: Array<FoundDevice> = [];

  for (let device = read_ptr(devices_ptr); device !== null;) {
    // Decode the struct.
    init_struct_pcap_if();
    const pcap_if: StructPcapIf = koffi.decode(device, 'pcap_if');
  
    // Parse the struct and store it.
    devices.push(parse_pcap_if(pcap_if));

    // Iterate to next device.
    device = pcap_if.next;
  }

  return devices;
};
