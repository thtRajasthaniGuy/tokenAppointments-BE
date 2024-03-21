import express from "express";
import { bookAppointment } from "../controllers/appointment";
const router = express.Router();
router.route("/book-appointment").post(bookAppointment);
export { router };
