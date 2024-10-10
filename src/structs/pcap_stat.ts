import koffi from "koffi";
let initialized = false;

/** @see https://github.com/the-tcpdump-group/libpcap/blob/master/pcap/pcap.h#L302 */
export const init_struct_pcap_stat = (): void => {
  if (initialized) return;

  const struct: Record<string, any> = {
    ps_recv: "uint",
    ps_drop: "uint",
    ps_ifdrop: "uint",

    // Should be replaced.
    ps_capt: undefined,
    ps_sent: undefined,
    ps_netdrop: undefined
  };

  if (process.platform === "win32") {
    struct.ps_capt = "uint";
    struct.ps_sent = "uint";
    struct.ps_netdrop = "uint";
  }
  else {
    delete struct.ps_capt;
    delete struct.ps_sent;
    delete struct.ps_netdrop;
  }

  koffi.struct("pcap_stat", struct);

  initialized = true;
};
