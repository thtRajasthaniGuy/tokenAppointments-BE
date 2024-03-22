import { app } from "./app";
import { mongoDbConnect } from "./src/config/db";

import http from "http";

const cloudinary = require("cloudinary");
import { initSocketEvents } from "./src/socket.io/socketEvents"; // Import the socket event handling module

const server = http.createServer(app);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

mongoDbConnect().then(() => {
  initSocketEvents(server);

  server.listen(process.env.PORT, () => {
    console.log(`API server is running at ${process.env.PORT}`);
  });
});

export { app };
