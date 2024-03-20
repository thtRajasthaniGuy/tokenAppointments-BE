import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { generateCustomId } from "../utils/nanoId";
const Speciality = new Schema(
  {
    id: {
      type: String,
      default: async () => await generateCustomId("Speciality1234567890", 10),
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

module.exports = mongoose.model("Speciality", Speciality);
