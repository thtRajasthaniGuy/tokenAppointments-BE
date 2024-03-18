import mongoose from "mongoose";
const { customAlphabet } = require("nanoid");
const Schema = mongoose.Schema;
const nanoid = customAlphabet("Speciality1234567890", 10);

const Speciality = new Schema(
  {
    id: {
      type: String,
      default: nanoid,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "Speciality" }
);

module.exports = mongoose.model("Clinic", Speciality);
