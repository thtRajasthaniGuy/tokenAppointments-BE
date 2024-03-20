import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { generateCustomId } from "../utils/nanoId";
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
      default: async () => await generateCustomId("Doc1234567890", 10),
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
    unavailableDates: [{ type: Date }], // Array of unavailable dates
  },
  { collection: "Doctor" }
);

module.exports = mongoose.model("Doctor", Doctor);
