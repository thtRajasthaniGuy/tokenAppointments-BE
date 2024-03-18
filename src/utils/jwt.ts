import jwt from "jsonwebtoken";

function isTokenExpired(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECREAT);
    const currentUnixTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (decoded.exp < currentUnixTime) {
      return true; // Token is expired
    } else {
      return false; // Token is not expired
    }
  } catch (error) {
    return true; // Token is invalid or expired
  }
}
