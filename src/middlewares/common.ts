// import { CustomError } from "../utils/customError";
// import { BigPromises } from "./bigPromises";
// import jwt from "jsonwebtoken";

// const isRiderLoggedIn = BigPromises(async (req: any, res: any, next: any) => {
//   try {
//     const token =
//       req?.headers?.authorization &&
//       req?.headers?.authorization.replace("Bearer ", "");

//     if (!token) {
//       return res
//         .status(401)
//         .json({ status: false, msg: "user not authorized" });
//     }

//     const decodedToken: any = jwt.verify(token, process.env.JWT_SECREAT);

//     req.user = await Rider.findById(decodedToken?.id);
//     next();
//   } catch (error) {
//     next(res.status(401).json({ status: false, msg: "user not authorized" }));
//   }
// });

// const isDriverLoggedIn = BigPromises(async (req: any, res: any, next: any) => {
//   try {
//     const token =
//       req?.headers?.authorization &&
//       req?.headers?.authorization.replace("Bearer ", "");

//     if (!token) {
//       return res
//         .status(401)
//         .json({ status: false, msg: "user not authorized" });
//     }

//     const decodedToken: any = jwt.verify(token, process.env.JWT_SECREAT);

//     req.user = await Driver.findById(decodedToken?.id);
//     next();
//   } catch (error) {
//     next(res.status(401).json({ status: false, msg: "user not authorized" }));
//   }
// });

// const isAdminLoggedIn = BigPromises(async (req: any, res: any, next: any) => {
//   const token =
//     req.cookies.token ||
//     (req.header("Authorization") &&
//       req.header("Authorization").replace("Bearer ", ""));

//   if (!token) {
//     return res.status(401).json({ status: false, msg: "user not authorized" });
//   }

//   const decodedToken: any = jwt.verify(token, process.env.JWT_SECREAT);
//   req.user = await Admin.findById(decodedToken?.id);
//   next();
// });

// const customeRole = (...roles) => {
//   return (req: any, res: any, next: any) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new CustomError("you are not allowed for this resource", 403)
//       );
//     }
//     next();
//   };
// };

// export { customeRole, isDriverLoggedIn, isRiderLoggedIn, isAdminLoggedIn };