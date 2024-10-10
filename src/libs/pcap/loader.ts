import koffi from "koffi";
import { cached } from "~/utils/initializers";

export const load_libpcap = (): koffi.IKoffiLib => {
  return cached(load_libpcap, () => {
    let destination: string;

    switch (process.platform) {
      case "win32":
        destination = "wpcap.dll";
        break;
      case "darwin":
        destination = "libpcap.dylib";
        break;
      default:
        destination = "libpcap.so";
    }

    return koffi.load(destination);
  });
};
