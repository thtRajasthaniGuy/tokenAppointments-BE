const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to compare the entered password with the hashed password
async function comparePassword(enteredPassword, hashedPassword) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
}

// Function to generate JWT access token
function generateAccessToken(userId) {
  const accessToken = jwt.sign({ userId }, "your_secret_key", {
    expiresIn: "1h",
  });
  return accessToken;
}
