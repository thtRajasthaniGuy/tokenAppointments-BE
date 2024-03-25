import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { generateCustomId } from "../utils/nanoId";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const timeSlotSchema = new Schema({
  dayOfWeek: { type: String }, // Monday, Tuesday, etc.
  slots: [
    {
      startTime: { type: String }, // 9:00 AM
      endTime: { type: String }, // 12:00 PM
    },
  ],
});
const Doctor = new Schema(
  {
    name: {
      type: String,
    },
    id: {
      type: String,
      unique: true,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    clinic: {
      type: String,
      ref: "Clinic",
    },
    speciality: {
      type: [String],
    },
    availability: [timeSlotSchema], // Array of time slots for different days
    unavailableDates: [{ type: Date }],
    role: {
      type: String,
      default: "doctor",
    }, // Array of unavailable dates
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "Doctor" }
);

Doctor.pre("save", async function (next) {
  const doctor = this;
  if (!this.id) {
    try {
      // Generate the custom ID
      const id = await generateCustomId("Doc1234567890", 10);
      this.id = id;
    } catch (error) {
      console.error("Error generating ID:", error);
      next(error); // Pass error to the next middleware
    }
  }

  if (doctor.isModified("password")) {
    try {
      const hash = bcrypt.hashSync(doctor.password, saltRounds);
      doctor.password = hash;
    } catch (error) {
      console.error("Error hashing password:", error);
      return next(error); // Pass error to the next middleware
    }
  }
  next(); // Call the next middleware
});

module.exports = mongoose.model("Doctor", Doctor);
