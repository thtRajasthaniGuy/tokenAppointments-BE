const mongoose = require("mongoose");
const DoctorToken = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      ref: "Doctor",
      required: true,
    },
    clinicId: {
      type: String,
      ref: "Clinic",
      required: true,
    },
    date: { type: Date, required: true },
    currentToken: { type: Number, default: 0 },
    totalToken: { type: Number, default: 0 },
    isAvailableToday: { type: Boolean, default: true },
  },
  { collection: "DoctorToken" }
);

module.exports = mongoose.model("DoctorToken", DoctorToken);
