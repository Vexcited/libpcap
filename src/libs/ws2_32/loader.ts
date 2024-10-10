import koffi from "koffi";
import { cached } from "~/utils/initializers";
import { is_win32, UnsupportedOS } from "~/utils/os";

export const load_Ws2_32_dll = (): koffi.IKoffiLib => {
  if (!is_win32) throw new UnsupportedOS();

  return cached(load_Ws2_32_dll, () => {
    return koffi.load("Ws2_32.dll");
  });
};
