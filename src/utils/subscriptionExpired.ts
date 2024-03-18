import moment from "moment";

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

// Example usage
const endDate = "2022-12-31"; // Replace with the actual end date of the subscription
const expirationMessage = checkSubscriptionExpiration(endDate);
console.log(expirationMessage);
