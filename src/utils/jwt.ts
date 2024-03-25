import jwt from "jsonwebtoken";
const Clinic = require("../models/clinic");
import { BigPromises } from "../middlewares/bigPromises";
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

const isUserLogin = BigPromises(async (req: any, res: any, next: any) => {
  try {
    const token =
      req?.headers?.authorization &&
      req?.headers?.authorization.replace("Bearer ", "");

    if (!token || isTokenExpired(token)) {
      return res
        .status(401)
        .json({ status: false, msg: "Token is expired or not provided" });
    }
    const decodedToken: any = jwt.verify(token, process.env?.JWT_SECREAT);

    req.user = await Clinic.findById(decodedToken?.id);
    next();
  } catch (error) {
    console.log(error);
    next(res.status(401).json({ status: false, msg: "user not authorized" }));
  }
});

export { isUserLogin };
