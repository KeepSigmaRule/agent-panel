import {io} from "socket.io-client";

export const socketService = {
  connect,
};
//window.location.hostname
function connect() {
  return new Promise((resolve, reject) => {
    const socket = io('https://dev.mymeander.com');
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}