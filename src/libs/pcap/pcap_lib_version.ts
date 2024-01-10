import koffi from 'koffi';

import { load_wpcap_dll } from './loader';
import { init_struct_pcap_if } from '~/structs/pcap_if';

let fn: koffi.KoffiFunction | undefined;

export const pcap_lib_version = (): string => {
  if (!fn) {
    const wpcap = load_wpcap_dll();
    init_struct_pcap_if();

    fn = wpcap.func('const char *pcap_lib_version(void)');
  }

  return fn();
};
