import express from "express";
import {    clinicRegister  } from "../controllers/clinic";
const router = express.Router();
router.route("/clinic-register").post(clinicRegister);

export { router };