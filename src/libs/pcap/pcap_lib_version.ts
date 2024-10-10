import koffi from 'koffi';

import { load_libpcap } from './loader';

let fn: koffi.KoffiFunction | undefined;

export const pcap_lib_version = (): string => {
  if (!fn) {
    const wpcap = load_libpcap();

    fn = wpcap.func('const char *pcap_lib_version(void)');
  }

  return fn();
};
