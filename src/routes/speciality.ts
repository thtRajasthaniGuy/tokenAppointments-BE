import express from "express";
import { specialityRegister } from "../controllers/speciality";
const router = express.Router();
router.route("/speciality-register").post(specialityRegister);

export { router };