import { init_struct_pcap_addr, type StructPcapAddr } from "~/structs/pcap_addr";
import { cached } from "~/utils/initializers";
import type { ext } from "~/types/external";
import koffi from "koffi";

export interface StructPcapIf {
  next: ext<StructPcapIf> | null
  name: string
  description: string
  addresses: ext<StructPcapAddr>
  flags: number
}

export const init_struct_pcap_if = async (): Promise<void> => {
  return cached(init_struct_pcap_if, async () => {
    await init_struct_pcap_addr();

    koffi.struct("pcap_if", {
      next: "pcap_if *",
      name: "char *",
      description: "char *",
      addresses: "pcap_addr *",
      flags: "uint"
    });
  });
};
