import koffi from 'koffi';
import type { ptr } from '~/utils/pointer';

import { load_wpcap_dll } from './loader';
import { init_struct_pcap_if } from '~/structs/pcap_if';

let fn: koffi.KoffiFunction | undefined;

export const pcap_findalldevs = (devices_ptr: ptr, error_buffer: ptr): number => {
  if (!fn) {
    const wpcap = load_wpcap_dll();
    init_struct_pcap_if();

    fn = wpcap.func('int pcap_findalldevs(_Out_ pcap_if **devices_ptr, _Out_ char *error_buffer)');
  }

  return fn(devices_ptr, error_buffer);
};
