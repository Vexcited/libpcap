import koffi from 'koffi';

import { ptr } from "~/utils/pointer";
import { load_libpcap } from './loader';
import { init_struct_pcap } from '~/structs/pcap';

let fn: koffi.KoffiFunction | undefined;

/**
 * @see https://www.tcpdump.org/manpages/pcap_open_live.3pcap.html
 */
export const pcap_open_live = (device: string, snaplen: number, promisc: number, to_ms: number, errbuf: ptr) => {
  if (!fn) {
    const wpcap = load_libpcap();
    init_struct_pcap()

    fn = wpcap.func('pcap *pcap_open_live(const char *device, int snaplen, int promisc, int to_ms, _Out_ char *errbuf)');
  }

  return fn(device, snaplen, promisc, to_ms, errbuf);
};
