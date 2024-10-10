import koffi from "koffi";
import { cached } from "~/utils/initializers";
import { is_win32, UnsupportedOS } from "~/utils/os";

export interface WindowsStructIn6Addr {
  u: (
    | { Byte: Array<number> }
    | { Word: Array<number> }
  )
}

/** @see https://learn.microsoft.com/en-us/windows/win32/api/in6addr/ns-in6addr-in6_addr */
export const init_windows_struct_in6_addr = (): void => {
  if (!is_win32) throw new UnsupportedOS();

  cached(init_windows_struct_in6_addr, () => {
    koffi.struct("in6_addr", {
      u: koffi.union({
        Byte: "uchar [16]",
        Word: "ushort [8]"
      })
    });
  });
};
