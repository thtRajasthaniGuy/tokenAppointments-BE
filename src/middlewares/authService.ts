const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

// Function to compare the entered password with the hashed password
async function comparePassword(enteredPassword, hashedPassword) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
}

// Function to generate JWT access token
function generateAccessToken(userId) {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECREAT, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return accessToken;
}
