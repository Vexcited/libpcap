import koffi from "koffi";
let initialized = false;

/** @see https://learn.microsoft.com/en-us/windows/win32/api/winsock2/ns-winsock2-timeval */
export const init_windows_struct_timeval = (): void => {
  if (initialized) return;

  if (process.platform !== "win32") {
    throw new Error("Selected 'timeval' structure for Windows only.");
  }

  koffi.struct("timeval", {
    tv_sec: "long",
    tv_usec: "long"
  });

  initialized = true;
};
