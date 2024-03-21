import express from "express";
import { NextUserToken } from "../controllers/doctorToken";
const router = express.Router();
router.route("/next-user").post(NextUserToken);

export { router };
