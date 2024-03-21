import express from "express";
import { isUserLogin } from "../utils/jwt";
import { doctorRegister } from "../controllers/doctor";
const router = express.Router();
router.route("/doctor-register").post(isUserLogin, doctorRegister);

export { router };
