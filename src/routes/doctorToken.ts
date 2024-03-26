import express from "express";
import { isUserLogin } from "../utils/jwt";
import { NextUserToken,GetDoctorTokens } from "../controllers/doctorToken";
const router = express.Router();
router.route("/next-user").post(isUserLogin, NextUserToken);
router.route("/get-doctor-token/:clinicId").get(isUserLogin,GetDoctorTokens );

export { router };
