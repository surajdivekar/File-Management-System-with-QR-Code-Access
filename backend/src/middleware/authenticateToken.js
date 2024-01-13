const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET || "default-secret-key";

function authenticateToken(req, res, next) {
  const token1 = req.header("Authorization");
  if (!token1) return res.status(401).json({ message: "Access denied" });
  console.log(token1);
  const token = token1.slice(7);
  console.log(token);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;

    // Check the user's role
    if (user.role === "admin") {
      // This user is an admin
      console.log("Admin Access");
      // You can perform admin-specific actions here
    } else if (user.role === "user") {
      // This user is a regular user
      console.log("User Access");
      // You can perform user-specific actions here
    } else {
      // Unknown role
      return res.status(403).json({ message: "Invalid user role" });
    }

    next();
  });
}

module.exports = authenticateToken;
