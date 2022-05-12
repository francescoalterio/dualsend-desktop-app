const { networkInterfaces } = window.require("os");

const $ip = document.getElementById("ip");

const interfaces = networkInterfaces();
let myAddress = "";
for (const name of Object.keys(interfaces)) {
  for (const address of interfaces[name]) {
    if (address.family === "IPv4" && !address.internal) {
      myAddress = address.address;
    }
  }
}

$ip.innerText = myAddress;
