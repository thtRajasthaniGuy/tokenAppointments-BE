import express from "express";
import { isUserLogin } from "../utils/jwt";
import { NextUserToken, GetAllDoctorTokens } from "../controllers/doctorToken";
const router = express.Router();
router.route("/next-user").post(isUserLogin, NextUserToken);
router
  .route("/get-all-doctor-token/:clinicId")
  .get(isUserLogin, GetAllDoctorTokens);

export { router };
