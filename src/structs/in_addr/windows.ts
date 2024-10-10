import koffi from "koffi";
import { cached } from "~/utils/initializers";
import { is_win32, UnsupportedOS } from "~/utils/os";

export interface WindowsStructInAddr {
  S_un: (
    | {
      S_un_b: {
        s_b1: number
        s_b2: number
        s_b3: number
        s_b4: number
      }
    }
    | {
      S_un_w : {
        s_w1: number
        s_w2: number
      }
    }
    | {
      S_addr: number
    }
  )
}

/**
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winsock2/ns-winsock2-in_addr
 */
export const init_windows_struct_in_addr = (): void => {
  if (!is_win32) throw new UnsupportedOS();

  cached(init_windows_struct_in_addr, () => {
    koffi.struct("in_addr", {
      S_un: koffi.union({
        S_un_b: koffi.struct({
          s_b1: "uchar",
          s_b2: "uchar",
          s_b3: "uchar",
          s_b4: "uchar"
        }),

        S_un_w: koffi.struct({
          s_w1: "ushort",
          s_w2: "ushort"
        }),

        S_addr: "ulong"
      })
    });
  });
};
