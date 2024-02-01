import koffi from "koffi";
let initialized = false;

export const init_struct_bpf_insn = () => {
  if (initialized) return;

  koffi.struct("bpf_insn", {
    code: "ushort",
    jt: "uchar",
    jf: "uchar",
    k: process.platform === "win32" ? "unsigned long" : "uint",
  });

  initialized = true;
};
