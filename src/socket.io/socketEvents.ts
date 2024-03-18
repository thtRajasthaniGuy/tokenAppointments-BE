import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";

const initSocketEvents = (server: HttpServer) => {
  const io: SocketServer = new SocketServer(server);

  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    socket.on("changeTokenNumber", (newTokenNumber) => {
      io.emit("updateTokenNumber", newTokenNumber);
    });
  });
};

export { initSocketEvents };
