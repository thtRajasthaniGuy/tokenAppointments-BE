import express from "express";
import { isUserLogin } from "../utils/jwt";
import {
  doctorRegister,
  doctorLogin,
  getDoctorByClinicId,
  doctorDelete,
  updateDoctorInfo,
} from "../controllers/doctor";
const router = express.Router();
router.route("/doctor-register").post(isUserLogin, doctorRegister);
router.route("/doctor-login").post(doctorLogin);
router.route("/get-doctor-by-clinic-id/:id").get(getDoctorByClinicId);
router.route("/doctor-delete").post(isUserLogin, doctorDelete);
router.route("/update-doctor").post(isUserLogin, updateDoctorInfo);

export { router };
