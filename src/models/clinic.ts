import mongoose from "mongoose";
import { generateCustomId } from "../utils/nanoId";
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const saltRounds = 10;

const Clinic = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    doctors: {
      type: [
        {
          type: String,
          ref: "Doctor",
        },
      ],
      validate: {
        validator: function (doctors) {
          return doctors.length <= 10;
        },
        message: "Maximum 10 doctors allowed.",
      },
    },
    address: {
      type: String,
    },
    id: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    speciality: {
      type: [String],
    },
    role: {
      type: String,
      default: "clinic",
    },
  },
  { collection: "Clinic" }
);

Clinic.pre("save", async function (next) {
  const clinic = this; // Store a reference to 'this' context

  if (!clinic.id) {
    try {
      // Generate the custom ID
      const id = await generateCustomId("Clinic1234567890", 10);
      clinic.id = id;
    } catch (error) {
      console.error("Error generating ID:", error);
      return next(error); // Pass error to the next middleware
    }
  }

  if (clinic.isModified("password")) {
    try {
      const hash = bcrypt.hashSync(clinic.password, saltRounds);
      clinic.password = hash;
    } catch (error) {
      console.error("Error hashing password:", error);
      return next(error); // Pass error to the next middleware
    }
  }

  next(); // Call next to proceed to the next middleware
});

module.exports = mongoose.model("Clinic", Clinic);
