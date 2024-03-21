import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Appointment = new Schema(
  {
    doctor: {
      type: String,
      ref: "Doctor",
      required: true,
    },
    clinic: {
      type: String,
      ref: "Clinic",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    tokenNumber: {
      type: Number,
      required: true,
    },
  },
  { collection: "Appointment" }
);

module.exports = mongoose.model("Appointment", Appointment);
