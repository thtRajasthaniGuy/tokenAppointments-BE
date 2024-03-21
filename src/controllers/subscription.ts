const ClinicSubscriptions = require("../models/subscriptions");
import { BigPromises } from "../middlewares/bigPromises";
const specialityRegister = BigPromises(async (req, res, next) => {
  const { clinic, subscriptionType, startDate, amountPaid, duration } =
    req.body;

  try {
    let subscription = await ClinicSubscriptions.findOne({ clinic });

    // Calculate end date based on subscription type
    let endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + Number(subscriptionType));

    if (subscription) {
      // Update existing subscription
      subscription.clinic = clinic;
      subscription.startDate = startDate;
      subscription.endDate = endDate;
      subscription.amountPaid = amountPaid;
      subscription.duration = duration;
      await subscription.save();
      res.status(200).json({
        message: "Subscription updated successfully",
        subscription,
        status: true,
      });
    } else {
      // Create new subscription
      subscription = new ClinicSubscriptions({
        clinic,
        startDate,
        endDate,
        amountPaid,
        duration,
      });

      await subscription.save();
      res.status(201).json({
        message: "Subscription created successfully",
        subscription,
        status: true,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

export { specialityRegister };
