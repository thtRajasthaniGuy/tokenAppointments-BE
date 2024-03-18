import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PurchaseHistory = new Schema(
  {
    clinic: {
      type: String,
      ref: "Clinic",
      required: true,
    },
    purchaseDate: {
      type: Date,
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
  { collection: "PurchaseHistory" }
);

module.exports = mongoose.model("PurchaseHistory", PurchaseHistory);
