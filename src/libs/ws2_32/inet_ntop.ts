import type { SOCKET_ADDRESS_FAMILY } from '~/constants';
import koffi from 'koffi';

import { load_Ws2_32_dll } from './loader';
import { init_windows_struct_in_addr } from '~/structs/windows_in_addr';
import { init_windows_struct_in6_addr } from '~/structs/windows_in6_addr';

let fn: koffi.KoffiFunction | undefined;

/** @see https://learn.microsoft.com/en-us/windows/win32/api/ws2tcpip/nf-ws2tcpip-inet_ntop */
export const inet_ntop = (Family: SOCKET_ADDRESS_FAMILY, pAddr: any, pStringBuf: [string], StringBufSize: number): string => {
  if (!fn) {
    const Ws2_32 = load_Ws2_32_dll();
    init_windows_struct_in_addr();
    init_windows_struct_in6_addr();

    fn = Ws2_32.func("const char *inet_ntop(int Family, const void *pAddr, _Out_ char *pStringBuf, size_t StringBufSize)");
  }

  return fn(Family, pAddr, pStringBuf, StringBufSize);
};
