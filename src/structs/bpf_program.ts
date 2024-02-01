import { init_struct_bpf_insn } from "./bpf_insn";
import koffi from "koffi";
let initialized = false;

export const init_struct_bpf_program = () => {
  if (initialized) return;
  init_struct_bpf_insn();

  koffi.struct("bpf_program", {
    bf_len: "uint",
    bf_insns: "bpf_insn *"
  });

  initialized = true;
};
