import express from "express";
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
import morgen from "morgan";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(morgen("tiny"));
app.get("/api/v1", async (req, res) => {
    res.status(200).json({ msg: "shree ganehsa namye" });
  });
  
  export { app };

