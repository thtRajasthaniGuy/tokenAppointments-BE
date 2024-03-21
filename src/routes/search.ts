import express from "express";
import { search } from "../controllers/search";
const router = express.Router();
router.route("/search").get(search);

export { router };
