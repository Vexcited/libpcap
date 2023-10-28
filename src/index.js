const koffi = require('koffi');
const lib = koffi.load('wpcap.dll');

koffi.struct('sockaddr', {
  sa_family: 'ushort',
  sa_data: 'char []'
});

koffi.struct('pcap_addr', {
  next: 'void *',
  addr: 'sockaddr *',
  netmask: 'sockaddr *',
  broadaddr: 'sockaddr *',
  dstaddr: 'sockaddr *'
});

koffi.struct('pcap_if', {
  next: 'void *',
  name: 'char *',
  description: 'char *',
  addresses: 'pcap_addr *',
  flags: 'uint',
});

koffi.alias('pcap_if_t', 'pcap_if');

const pcap_findalldevs = lib.func('int pcap_findalldevs(_Out_ pcap_if_t **devices_ptr, _Out_ char *error_buffer)');
function findAllDevs() {
  let error_buffer = [''];
  let devices_ptr = [{}];

  pcap_findalldevs(devices_ptr, error_buffer);
  const data = devices_ptr;

  let decoded = koffi.decode(data[0], 'pcap_if_t');
  const devices = [decoded];

  while (decoded.next) {
    decoded = koffi.decode(decoded.next, 'pcap_if_t');
    if (decoded) {
      devices.push(decoded);
    }
  }

  return devices;
}

exports.findAllDevs = findAllDevs;
