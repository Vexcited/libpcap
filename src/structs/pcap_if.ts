import type { ext } from "~/types/external";
import { init_struct_pcap_addr, type StructPcapAddr } from "./pcap_addr";
import koffi from "koffi";
let initialized = false;

export interface StructPcapIf {
  next: ext<StructPcapIf> | null
  name: string
  description: string
  addresses: ext<StructPcapAddr>
  flags: number
}

export const init_struct_pcap_if = (): void => {
  if (initialized) return;
  init_struct_pcap_addr();

  koffi.struct('pcap_if', {
    next: 'pcap_if *',
    name: 'char *',
    description: 'char *',
    addresses: 'pcap_addr *',
    flags: 'uint'
  });

  initialized = true;
};
