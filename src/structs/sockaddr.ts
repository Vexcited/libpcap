import type { SOCKET_ADDRESS_FAMILY } from "~/constants";
import koffi from "koffi";
let initialized = false;

export interface StructSockAddr {
  /** Address family */
  sa_family: SOCKET_ADDRESS_FAMILY
  /** 14 bytes of protocol address */
  sa_data: string
}

export const init_struct_sockaddr = (): void => {
  if (initialized) return;

  koffi.struct('sockaddr', {
    sa_family: 'ushort',
    sa_data: 'char [14]' 
  });

  initialized = true;
};
