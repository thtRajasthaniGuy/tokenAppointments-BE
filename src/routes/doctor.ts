import express from "express";
import {    doctorRegister  } from "../controllers/doctor";
const router = express.Router();
router.route("/doctorRegister").post(doctorRegister);

export { router };