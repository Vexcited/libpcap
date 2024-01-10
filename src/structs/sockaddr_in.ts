import type { ext } from "~/types/external";
import { type WindowsStructInAddr, init_windows_struct_in_addr } from "./windows_in_addr";
import koffi from "koffi";
let initialized = false;

export interface StructSockAddrIn {
  sin_family: number
  sin_port: number
  sin_addr: ext<WindowsStructInAddr>
  sin_zero: string
}

export const init_struct_sockaddr_in = () => {
  if (initialized) return;

  // Make sure the `in_addr` structure was initialized.
  if (process.platform === "win32") {
    init_windows_struct_in_addr();
  } else throw new Error("Platform not supported.");

  koffi.struct("sockaddr_in", {
    sin_family: "short",
    sin_port: "ushort",
    sin_addr: "in_addr",
    sin_zero: "char [8]"
  });

  initialized = true;
};
