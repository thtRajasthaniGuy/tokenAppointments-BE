import moment from "moment";
const Subscription = require("../models/subscriptions");
// Utility function to check subscription expiration
function checkSubscriptionExpiration(endDate) {
  const currentDate = moment();
  const expirationDate = moment(endDate);

  if (expirationDate.isBefore(currentDate)) {
    return { expired: true, message: `Your subscription has expired.` };
  }

  const remainingDays = expirationDate.diff(currentDate, "days");
  if (remainingDays <= 7) {
    return {
      expired: false,
      message: `Your subscription will expire in ${remainingDays} days.`,
    };
  } else if (remainingDays <= 5) {
    return {
      expired: false,
      message: `Your subscription will expire in ${remainingDays} days.`,
    };
  } else if (remainingDays <= 3) {
    return {
      expired: false,
      message: `Your subscription will expire in ${remainingDays} days.`,
    };
  } else if (remainingDays <= 1) {
    return {
      expired: false,
      message: `Your subscription will expire in ${remainingDays} days.`,
    };
  } else {
    return { expired: false, message: `Your subscription is still valid` };
  }
}

const checkSubscription = async (req, res, next) => {
  try {
    // Assuming the clinic's id is stored in req.clinic.id after login
    let subscription = await Subscription.findOne({
      clinic: req.clinic.id,
    }).sort({ endDate: -1 });

    // Check if the clinic has an active subscription
    if (subscription && subscription.endDate > new Date()) {
      next(); // If the subscription is active, proceed to the next middleware
    } else {
      // If the subscription has expired, send a response
      return res.status(403).json({
        msg: "Subscription has expired",
        status: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
      status: false,
    });
  }
};

export { checkSubscription, checkSubscriptionExpiration };
