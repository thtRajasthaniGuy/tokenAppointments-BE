const mongoose = require("mongoose");

const patientToken = new mongoose.Schema(
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
    currentToken: { type: Number, default: 0 },
    totalToken: { type: Number, default: 0 },
  },
  { collection: "patientToken" }
);

const PatientToken = mongoose.model("patientToken", patientToken);
