import koffi from "koffi";
let initialized = false;

/** @see https://github.com/the-tcpdump-group/libpcap/blob/libpcap-1.10/pcap-int.h#L165 */
export const init_struct_pcap_out = (): void => {
  if (initialized) return;

  const struct: Record<string, any> = {
    device: "char *",
    timeout: "int",
    buffer_size: "uint",
    promisc: "int",
    rfmon: "int",
    immediate: "int",
    nonblock: "int",
    tstamp_type: "int",
    tstamp_precision: "int",

    // To be replaced manually
    protocol: undefined,
    nocapture_local: undefined
  };

  if (process.platform === "win32") {
    delete struct.protocol;
    struct.nocapture_local = "int";
  }
  else {
    delete struct.nocapture_local;
    struct.protocol = "int";
  }

  koffi.struct("pcap_opt", struct);

  initialized = true;
};
