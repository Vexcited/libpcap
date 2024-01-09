import koffi from 'koffi';
let lib: koffi.IKoffiLib | undefined;

export const load_Ws2_32_dll = (): koffi.IKoffiLib => {
  if (lib) return lib;
  
  lib = koffi.load("Ws2_32.dll");
  return lib;
};
