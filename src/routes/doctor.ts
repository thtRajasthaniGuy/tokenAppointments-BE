import express from "express";
import {    doctorRegister  } from "../controllers/doctor";
const router = express.Router();
router.route("/doctor-register").post(doctorRegister);

export { router };