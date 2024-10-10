import { findAllDevs, openLive } from "../src";

void async function main () {
  const devices = await findAllDevs();
  const device = devices.find((device) => device.name === "en0");

  if (!device)
    throw new Error("Network device not connected");

  const handler = openLive(device.name, 1518, true, -1);
  console.log(handler);
}();
