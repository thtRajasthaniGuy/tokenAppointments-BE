import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { generateCustomId } from "../utils/nanoId";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Clinic = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    doctors: [
      {
        type: String,
        ref: "Doctor",
      },
    ],
    address: {
      type: String,
    },
    id: {
      type: String,
      default: async () => await generateCustomId("Clinic1234567890", 10),
      unique: true,
    },
    username: {
      type: String,
      required: true,
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
  },
  { collection: "Clinic" }
);

Clinic.pre("save", function (next) {
  if (this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, saltRounds, function (err, hash) {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("Clinic", Clinic);
