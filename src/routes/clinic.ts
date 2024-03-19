import express from "express";
import {    clinicRegister  } from "../controllers/clinic";
const router = express.Router();
router.route("/clinicRegister").post(clinicRegister);

export { router };