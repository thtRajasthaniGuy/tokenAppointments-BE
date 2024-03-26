import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";

let io: SocketServer;

const initSocketEvents = (server: HttpServer) => {
  io = new SocketServer(server);

  io.on("connection", (socket: Socket) => {
    console.log("A user connected");
  });
};

export { initSocketEvents, io };
