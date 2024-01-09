import { findAllDevs } from "../src/index";

const devices = findAllDevs();
devices.forEach((device) => {
  console.log(device.name);
  console.log("->", device.description);

  device.addresses?.forEach(address => {
    console.log(address);
  })
  
  console.log();
});
