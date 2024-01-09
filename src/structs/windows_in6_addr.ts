import koffi from "koffi";
let initialized = false;

/** @see https://learn.microsoft.com/en-us/windows/win32/api/in6addr/ns-in6addr-in6_addr */
export const init_windows_struct_in6_addr = (): void => {
  if (initialized) return;

  koffi.struct("in6_addr", {
    u: koffi.union({
      Byte: "uchar [16]",
      Word: "ushort [8]"
    })
  })

  initialized = true;
};
