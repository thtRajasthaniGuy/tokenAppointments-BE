import express from "express";
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
import morgen from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import { NextFunction, Request, Response } from "express";
import { router as SpecialityRouter } from "./src/routes/speciality";
import { router as Clinic } from "./src/routes/clinic";
import { router as Appointment } from "./src/routes/appointment";
import { router as Doctor } from "./src/routes/doctor";
import { router as DoctorToken } from "./src/routes/doctorToken";
import { router as Search } from "./src/routes/search";

const app = express();
require("dotenv").config();
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin!;

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method == "OPTIONS") {
    return res.sendStatus(200);
  }
  console.log({ url: req.url, origin });

  next();
});
app.use(bodyParser.json());
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
app.use("/api/v1", SpecialityRouter);
app.use("/api/v1", Clinic);
app.use("/api/v1", Appointment);
app.use("/api/v1", Doctor);
app.use("/api/v1", DoctorToken);
app.use("/api/v1", Search);
app.get("/api/v1", async (req, res) => {
  res.status(200).json({ msg: "shree ganehsa namye" });
});

export { app };
