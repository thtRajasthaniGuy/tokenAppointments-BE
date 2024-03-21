const PurchaseHistory = require("../models/PurchaseHistory");

const getPurchaseHistory = async (req, res) => {
  const { clinic } = req.params;

  try {
    const history = await PurchaseHistory.find({ id: clinic });
    res
      .status(200)
      .json({ message: "Purchase history retrieved successfully", history });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const createPurchaseHistory = async (req, res) => {
  const { clinic, purchaseDate, duration, startDate, endDate, amountPaid } =
    req.body;

  try {
    const history = new PurchaseHistory({
      clinic,
      purchaseDate,
      duration,
      startDate,
      endDate,
      amountPaid,
    });

    await history.save();
    res
      .status(201)
      .json({ message: "Purchase history created successfully", history });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export { getPurchaseHistory, createPurchaseHistory };
