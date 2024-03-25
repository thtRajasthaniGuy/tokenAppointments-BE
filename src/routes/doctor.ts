import express from "express";
import { isUserLogin } from "../utils/jwt";
import {
  doctorRegister,
  doctorLogin,
  getDoctorByClinicId,
} from "../controllers/doctor";
const router = express.Router();
router.route("/doctor-register").post(isUserLogin, doctorRegister);
router.route("/doctor-login").post(isUserLogin, doctorLogin);
router.route("/get-doctor-by-clinic-id").get(isUserLogin, getDoctorByClinicId);
router.route("/doctor-delete").post(isUserLogin, doctorRegister);

export { router };
