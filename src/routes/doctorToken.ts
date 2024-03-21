import express from "express";
import { isUserLogin } from "../utils/jwt";
import { NextUserToken } from "../controllers/doctorToken";
const router = express.Router();
router.route("/next-user").post(isUserLogin, NextUserToken);

export { router };
