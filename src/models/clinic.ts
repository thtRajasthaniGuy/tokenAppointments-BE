import mongoose from "mongoose";
const { customAlphabet } = require("nanoid");
const Schema = mongoose.Schema;
const nanoid = customAlphabet("Clinic1234567890", 10);
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
  },
  { collection: "Clinic" }
);

module.exports = mongoose.model("Clinic", Clinic);
