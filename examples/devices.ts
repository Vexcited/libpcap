import { findAllDevs } from "../src";
void async function main () {
  const devices = await findAllDevs();
  devices.forEach((device) => {
    console.log("\n---------");

    console.log(device.name, "/ flags:", device.flags);
    console.log("=>", device.description ?? "(no description)");

    console.log("---------");

    if (device.addresses.length > 0) {
      device.addresses.forEach((address) => {
        console.log("(address):", address.addr);
        console.log("(netmask):", address.netmask);
        console.log("(broadcast):", address.broadaddr);
        console.log("(destination):", address.dstaddr);
        console.log("---------");
      });
    }
    else {
      console.log("-> No address found on the device.");
    }
  });
}();
