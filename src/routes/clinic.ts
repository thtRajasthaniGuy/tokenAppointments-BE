import express from "express";
import { clinicRegister, clinicLogin, clinicUpdate } from "../controllers/clinic";
const router = express.Router();
router.route("/clinic-register").post(clinicRegister);
router.route("/clinic-update").post(clinicUpdate);
router.route("/clinic-login").get(clinicLogin);
export { router };
