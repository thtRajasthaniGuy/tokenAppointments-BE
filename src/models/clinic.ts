import mongoose from "mongoose";
const { customAlphabet } = require("nanoid");
const Schema = mongoose.Schema;
const nanoid = customAlphabet("Clinic1234567890", 10);
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
      default: nanoid,
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
