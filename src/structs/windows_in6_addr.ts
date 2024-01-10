import koffi from "koffi";
let initialized = false;

export interface WindowsStructIn6Addr {
  u: (
    | { Byte: Array<number> }
    | { Word: Array<number> }
  )
}

/** @see https://learn.microsoft.com/en-us/windows/win32/api/in6addr/ns-in6addr-in6_addr */
export const init_windows_struct_in6_addr = (): void => {
  if (initialized) return;

  if (process.platform !== "win32") {
    throw new Error("Selected 'in6_addr' structure for Windows only.");
  }

  koffi.struct("in6_addr", {
    u: koffi.union({
      Byte: "uchar [16]",
      Word: "ushort [8]"
    })
  })

  initialized = true;
};
