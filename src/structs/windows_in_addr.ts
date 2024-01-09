import koffi from "koffi";
let initialized = false;

/** @see https://learn.microsoft.com/en-us/windows/win32/api/winsock2/ns-winsock2-in_addr */
export const init_windows_struct_in_addr = () => {
  if (initialized) return;

  koffi.struct("in_addr", {
    S_un: koffi.union({
      S_un_b: koffi.struct({
        s_b1: "uchar",
        s_b2: "uchar",
        s_b3: "uchar",
        s_b4: "uchar"
      }),

      S_un_w: koffi.struct({
        s_w1: 'ushort',
        s_w2: 'ushort',
      }),

      S_addr: 'ulong'
    })
  });

  initialized = true;
};
