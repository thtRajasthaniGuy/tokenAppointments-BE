import express from "express";
import { clinicRegister, clinicLogin } from "../controllers/clinic";
const router = express.Router();
router.route("/clinic-register").post(clinicRegister);
router.route("/clinic-login").get(clinicLogin);
export { router };
