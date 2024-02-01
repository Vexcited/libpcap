import { findAllDevs } from "..";

const devices = findAllDevs();
devices.forEach((device) => {
  console.log("\n---------");

  console.log(device.name);
  console.log("=>", device.description);
  
  console.log("---------");

  if (device.addresses.length > 0) {
    device.addresses.forEach(address => {
      console.log("(address):", address.addr)
      console.log("(netmask):", address.netmask)
      console.log("(broadcast):", address.broadaddr)
      console.log("(destination):", address.dstaddr)
      console.log("---------")
    })
  }
  else {
    console.log("-> No address found on the device.");
  }
});
