import type { ext } from "~/types/external";
import koffi from "koffi";
import { cached } from "~/utils/initializers";
import { type WindowsStructInAddr, init_windows_struct_in_addr } from "~/structs/in_addr/windows";
import { is_win32, UnsupportedOS } from "~/utils/os";

export interface WindowsStructSockAddrIn {
  sin_family: number
  sin_port: number
  sin_addr: ext<WindowsStructInAddr>
  sin_zero: string
}

export const init_windows_struct_sockaddr_in = (): void => {
  if (!is_win32) throw new UnsupportedOS();

  cached(init_windows_struct_sockaddr_in, () => {
    init_windows_struct_in_addr();

    koffi.struct("sockaddr_in", {
      sin_family: "short",
      sin_port: "ushort",
      sin_addr: "in_addr",
      sin_zero: "char [8]"
    });
  });
};
