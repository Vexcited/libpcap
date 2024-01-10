import koffi from 'koffi';
let lib: koffi.IKoffiLib | undefined;

export const load_wpcap_dll = (): koffi.IKoffiLib => {
  if (lib) return lib;
  
  lib = koffi.load("wpcap.dll");
  return lib;
};
