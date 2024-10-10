import { init_struct_pcap_out } from "./pcap_out";
import koffi from "koffi";
import { init_struct_pcap_stat } from "./pcap_stat";
import { init_struct_bpf_program } from "./bpf_program";
import { init_struct_pcap_pkthdr } from "./pcap_pkthdr";
let initialized = false;

/** @see https://github.com/the-tcpdump-group/libpcap/blob/libpcap-1.10/pcap-int.h#L220 */
export const init_struct_pcap = (): void => {
  if (initialized) return;
  init_struct_pcap_out();
  init_struct_bpf_program();
  init_struct_pcap_pkthdr();
  init_struct_pcap_stat();

  koffi.opaque("HANDLE");

  koffi.struct("pcap", {
    read_op: "int",
    next_packet_op: "int",

    handle: "HANDLE *",

    bufsize: "uint",
    buffer: "void *",
    bp: "uchar *",
    cc: "int",

    // break_loop: "sig_atomic_t",

    priv: "void *",

    /*
      #ifdef ENABLE_REMOTE
	    struct pcap_samp rmt_samp;
      #endif
     */

    swapped: "int",
    rfile: "void *", // should've been "FILE *"
    fddipad: "uint",
    next: "pcap *",

    version_major: "int",
    version_minor: "int",

    snapshot: "int",
    linktype: "int",
    linktype_ext: "int",
    offset: "int",
    activated: "int",
    oldstyle: "int",

    opt: "pcap_opt",

    pkt: "uchar *",

    // Defined for Windows only.
    stat: "pcap_stat",

    direction: "int",

    bpf_codegen_flags: "int",

    fcode: "bpf_program",

    errbuf: "char [257]",
    acp_errbuf: "char [257]",

    dlt_count: "int",
    dlt_list: "uint *",
    tstamp_type_count: "int",
    tstamp_type_list: "uint *",
    tstamp_precision_count: "int",
    tstamp_precision_list: "uint *",

    pcap_header: "pcap_pkthdr",

    activate_op: "int",
    can_set_rfmon_op: "int",
    inject_op: "int",
    save_current_filter_op: "int",
    setfilter_op: "int",
    setdirection_op: "int",
    set_datalink_op: "int",
    getnonblock_op: "int",
    setnonblock_op: "int",
    stats_op: "int",
    breakloop_op: "int",

    // TODO: ???
    oneshot_callback: "void *",

    stats_ex_op: "int",
    setbuff_op: "int",
    setmode_op: "int",
    setmintocopy_op: "int",
    getevent_op: "int",
    oid_get_request_op: "int",
    oid_set_request_op: "int",
    sendqueue_transmit_op: "int",
    setuserbuffer_op: "int",
    live_dump_op: "int",
    live_dump_ended_op: "int",
    get_airpcap_handle_op: "int",

    cleanup_op: "int"
  });

  initialized = true;
};
