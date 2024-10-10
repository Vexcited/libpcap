import koffi from 'koffi';
let lib: koffi.IKoffiLib | undefined;

export const load_libpcap = (): koffi.IKoffiLib => {
  if (lib) return lib;
  let destination: string;

  switch (process.platform) {
    case 'win32':
      destination = "wpcap.dll";
      break;
    case 'darwin':
      destination = 'libpcap.dylib';
      break;
    default:
      destination = 'libpcap.so';
  }
  
  lib = koffi.load(destination);
  return lib;
};
