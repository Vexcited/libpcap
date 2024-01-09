import koffi from 'koffi';
import { SOCKET_ADDRESS_FAMILY } from './constants';
import { init_windows_struct_in_addr } from './structs/windows_in_addr';
import { init_windows_struct_in6_addr } from './structs/windows_in6_addr';
import { inet_ntop } from './libs/ws2_32/inet_ntop';
const wpcap = koffi.load('wpcap.dll');

init_windows_struct_in_addr();
init_windows_struct_in6_addr();

koffi.struct("sockaddr_in", {
  sin_family: "short",
  sin_port: "ushort",
  sin_addr: "in_addr",
  sin_zero: "char [8]"
});

koffi.struct("sockaddr_in6", {
  sin6_family: "uint16_t", // address family, AF_INET6
  sin6_port: "uint16_t", // port number, Network Byte Order
  sin6_flowinfo: "uint32_t", // IPv6 flow information
  sin6_addr: "in6_addr", // IPv6 address
  sin6_scope_id: "uint32_t" // Scope ID
})

koffi.struct('sockaddr', {
  sa_family: 'ushort', // address family, AF_xxx
  sa_data: 'char [14]' // 14 bytes of protocol address
});

koffi.struct('pcap_addr', {
  next: 'pcap_addr *',
  /* address */
  addr: 'sockaddr *',
  /* netmask for that address */
  netmask: 'sockaddr *',
  /* broadcast address for that address */
  broadaddr: 'sockaddr *',
  /* P2P destination address for that address */
  dstaddr: 'sockaddr *'
});

koffi.struct('pcap_if', {
  next: 'pcap_if *',
  name: 'char *',
  description: 'char *',
  addresses: 'pcap_addr *',
  flags: 'uint'
});

koffi.alias('pcap_if_t', 'pcap_if');

export interface Device {
  name: string;
  description: string;
  addresses: PcapAddr[] | null;
  flags: number;
}

/**
 * An implementation of the `sockaddr` struct.
 */
export interface SockAddr {
  sa_family: SOCKET_ADDRESS_FAMILY
  sa_data: string
}

/**
 * An implementation of the `pcap_addr` struct.
 */
export interface PcapAddr {
  addr: string
  netmask: string | null
  broadaddr: string | null
  dstaddr: string | null
}

function parseDeviceAddresses(first_address: any) {
  const addresses: PcapAddr[] = [];

  for (let address = first_address; address !== null;) {
    // Decode the address struct.
    const pcap_addr = koffi.decode(address, 'pcap_addr');
  
    let addr = koffi.decode(pcap_addr.addr, 'sockaddr');

    if (addr.sa_family === SOCKET_ADDRESS_FAMILY.AF_INET) {
      addr = koffi.decode(pcap_addr.addr, "sockaddr_in");
      addr = inet_ntop(addr.sin_family, koffi.as(addr.sin_addr, "in_addr *"), [""], 16);
    }
    else if (addr.sa_family === SOCKET_ADDRESS_FAMILY.AF_INET6) {
      addr = koffi.decode(pcap_addr.addr, "sockaddr_in6");
      addr = inet_ntop(addr.sin6_family, koffi.as(addr.sin6_addr, "in6_addr *"), [""], 46);
    }
    else addr = null;
  
    let netmask: string | null;
    if (pcap_addr.netmask) {
      netmask = koffi.decode(pcap_addr.netmask, 'sockaddr');
    } else netmask = null;

    let broadaddr: string | null;
    if (pcap_addr.broadaddr) {
      broadaddr = koffi.decode(pcap_addr.broadaddr, 'sockaddr');
    } else broadaddr = null;

    let dstaddr: string | null;
    if (pcap_addr.dstaddr) {
      dstaddr = koffi.decode(pcap_addr.dstaddr, 'sockaddr');
    } else dstaddr = null;
  
    addresses.push({
      addr,
      netmask,
      broadaddr,
      dstaddr
    });
  
    // Iterate to the next address.
    address = pcap_addr.next;
  }

  return addresses;
}

const pcap_findalldevs = wpcap.func('int pcap_findalldevs(_Out_ pcap_if_t **devices_ptr, _Out_ char *error_buffer)');
export function findAllDevs(): Array<Device> {
  const error_buffer = [''];
  const devices_ptr = [{}];

  const returnValue = pcap_findalldevs(devices_ptr, error_buffer);
  if (returnValue !== 0) { // Handle potential error.
    throw new Error(`pcap_findalldevs: returned value (${returnValue}) different from 0.\nerror_buffer: ${error_buffer[0] || "(empty)"}`);
  }
  
  const devices: Device[] = [];

  for (let device = devices_ptr[0]; device !== null;) {
    const pcap_if_t = koffi.decode(device, 'pcap_if_t');
  
    let addresses: PcapAddr[] | null;
    if (pcap_if_t.addresses) {
      addresses = parseDeviceAddresses(pcap_if_t.addresses);
    } else addresses = null;
  
    devices.push({
      name: pcap_if_t.name,
      description: pcap_if_t.description,
      addresses,
      flags: pcap_if_t.flags
    });

    // Iterate to next device.
    device = pcap_if_t.next;
  }

  return devices;
}
