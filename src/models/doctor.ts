import mongoose from "mongoose";
const { customAlphabet } = require("nanoid");
const Schema = mongoose.Schema;
const nanoid = customAlphabet("Doc1234567890", 10);
const Doctor = new Schema(
  {
    name: {
      type: String,
    },
    id: {
      type: String,
      default: nanoid,
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
  },
  { collection: "Doctor" }
);

module.exports = mongoose.model("Doctor", Doctor);
