import koffi from "koffi";
import { cached } from "~/utils/initializers";
import { is_darwin, is_win32, UnsupportedOS } from "~/utils/os";

export const load_libc = (): koffi.IKoffiLib => {
  if (is_win32) throw new UnsupportedOS();

  return cached(load_libc, () => {
    return koffi.load(is_darwin ? "libc.dylib" : "libc.so");
  });
};
