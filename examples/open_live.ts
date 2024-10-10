import { findAllDevs, openLive } from "../src";

// Get the device with the according description.
const device = findAllDevs().find(device => device.description === "MediaTek Wi-Fi 6 MT7921 Wireless LAN Card");
if (!device) throw new Error("Device not connected.");

const handler = openLive(device.name, 1500, true, -1);
console.log(handler);
