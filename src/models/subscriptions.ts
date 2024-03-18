import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ClinicSubscriptions = new Schema(
  {
    clinic: {
      type: String,
      ref: "Clinic",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
  },
  { collection: "ClinicSubscriptions" }
);

module.exports = mongoose.model("ClinicSubscriptions", ClinicSubscriptions);
