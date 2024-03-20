import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { generateCustomId } from "../utils/nanoId";
const Speciality = new Schema(
  {
    id: {
      type: String,
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

Speciality.pre("save", async function (next) {
  if (!this.id) {
    try {
      // Generate the custom ID
      const id = await generateCustomId("Speciality1234567890", 10);
      this.id = id;
    } catch (error) {
      console.error("Error generating ID:", error);
      next(error); // Pass error to the next middleware
    }
  }
  next(); // Call the next middleware
});

module.exports = mongoose.model("Speciality", Speciality);
