import koffi from 'koffi';
const lib = koffi.load('wpcap.dll');

koffi.struct('sockaddr', {
  sa_family: 'ushort',
  sa_data: 'char []'
});

koffi.struct('pcap_addr', {
  next: 'pcap_addr *',
  addr: 'sockaddr *',
  netmask: 'sockaddr *',
  broadaddr: 'sockaddr *',
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
  addresses: any[] | null;
  flags: number;
}

function parseDeviceAddresses(first_address: any) {
  let address = first_address;

  const addresses: any[] = [];

  while (address !== null) {
    const decoded_address = koffi.decode(address, 'pcap_addr');
    addresses.push(decoded_address);
    address = decoded_address.next;
  }

  return addresses;
}

const pcap_findalldevs = lib.func('int pcap_findalldevs(_Out_ pcap_if_t **devices_ptr, _Out_ char *error_buffer)');
export function findAllDevs() {
  // Pointers.
  const error_buffer = [''];
  const devices_ptr = [{}];

  pcap_findalldevs(devices_ptr, error_buffer);

  // TODO: Handle `error_buffer` ?
  // TODO: Handle the function output - gives an `int`.

  const devices: Device[] = [];

  let device = devices_ptr[0];
  while (device !== null) {
    const decoded_device = koffi.decode(device, 'pcap_if_t');

    const device_object: Device = {
      name: decoded_device.name,
      description: decoded_device.description,
      addresses: null,
      flags: decoded_device.flags
    }

    if (decoded_device.addresses) {
      device_object.addresses = parseDeviceAddresses(decoded_device.addresses);
    }

    devices.push(device_object);
    device = decoded_device.next;
  }

  return devices;
}
