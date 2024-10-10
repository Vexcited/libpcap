export interface PcapAddr {
  addr: string | null
  netmask: string | null
  broadaddr: string | null
  dstaddr: string | null
}

export interface FoundDevice {
  name: string;
  description: string | null;
  addresses: Array<PcapAddr>;
  flags: number;
}