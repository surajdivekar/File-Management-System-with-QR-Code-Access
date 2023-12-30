const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const pool = require("../config/databaseConfig");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function loginAdmin(req, res) {
  try {
    const { admin_email, password } = req.body;

    // Check if the admin with the provided email exists
    const query =
      "SELECT * FROM tbladmin WHERE admin_email = ? AND is_deleted = 0";
    const values = [admin_email];
    const [rows] = await pool.promise().query(query, values);

    if (!Array.isArray(rows) || rows.length === 0) {
      // Admin with the specified email not found or is marked as deleted
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = rows[0];

    // Verify the password
    if (!compareSync(password, admin.password)) {
      // Password is incorrect
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { admin_id: admin.admin_id },
      process.env.JWT_SECRET,
      {
        //   expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
      }
    );

    // Return both the token and admin details in the response
    res.json({ token, admin, message: "Login Successfully" });
  } catch (error) {
    console.error("Error during admin login:", error);

    // Send a detailed error response for debugging
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
    });
  }
}

async function getAllAdmins(req, res) {
  try {
    // Query the database to retrieve all active admins
    const query = "SELECT * FROM tbladmin WHERE is_deleted = 0";
    const [rows] = await pool.promise().query(query);

    console.log("Query Result:", rows);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching admins:", error);

    // Log the SQL query to help identify potential issues
    console.error("SQL Query:", "SELECT * FROM tbladmin WHERE is_deleted = 0");

    // Send a detailed error response for debugging
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
    });
  }
}

async function getAdminById(req, res) {
  try {
    const { id } = req.params;

    // Query the database to retrieve the active admin by ID
    const query =
      "SELECT * FROM tbladmin WHERE admin_id = ? AND is_deleted = 0";
    const values = [id];

    console.log("Query:", query, values);

    const [rows] = await pool.promise().query(query, values);

    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("Active admin not found");
      return res.status(404).json({ message: "Active admin not found" });
    }

    const admin = rows[0];
    console.log("Active admin found:", admin);

    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching active admin by ID:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
    });
  }
}

async function createAdmin(req, res) {
  try {
    const { admin_name, admin_email, admin_mbno, password } = req.body;

    // Generate a salt
    const salt = genSaltSync(10);

    // Hash the password with the salt
    const hashedPassword = hashSync(password, salt);

    // Insert the admin data into the database
    const query =
      "INSERT INTO tbladmin (admin_name, admin_email, admin_mbno, password) VALUES (?, ?, ?, ?)";
    const values = [admin_name, admin_email, admin_mbno, hashedPassword];

    const [result] = await pool.promise().query(query, values);

    console.log("Admin created successfully:", result);

    res.json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);

    // Send a detailed error response for debugging
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
    });
  }
}

async function updateAdmin(req, res) {
  try {
    const { admin_id, admin_name, admin_email, admin_mbno, password } =
      req.body;

    const checkQuery = "SELECT * FROM tbladmin WHERE admin_id = ?";
    const checkValues = [admin_id];
    const [checkRows] = await pool.promise().query(checkQuery, checkValues);

    if (!Array.isArray(checkRows) || checkRows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    let hashedPassword = checkRows[0].password;
    if (password) {
      const salt = genSaltSync(10);
      hashedPassword = hashSync(password, salt);
    }

    const updateQuery =
      "UPDATE tbladmin SET admin_name = ?, admin_email = ?, admin_mbno = ?, password = ? WHERE admin_id = ?";
    const updateValues = [
      admin_name,
      admin_email,
      admin_mbno,
      hashedPassword,
      admin_id,
    ];

    const [updateResult] = await pool
      .promise()
      .query(updateQuery, updateValues);

    console.log("Admin updated successfully:", updateResult);

    res.json({ message: "Admin updated successfully" });
  } catch (error) {
    console.error("Error updating admin:", error);

    // Send a detailed error response for debugging
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
    });
  }
}

async function deleteAdmin(req, res) {
  try {
    const { adminId } = req.params;
    const { admin_name, admin_email, admin_mbno, password } = req.body;

    const checkQuery = "SELECT * FROM tbladmin WHERE admin_id = ?";
    const checkValues = [adminId];
    const [checkRows] = await pool.promise().query(checkQuery, checkValues);

    if (!Array.isArray(checkRows) || checkRows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    let hashedPassword = checkRows[0].password;
    if (password) {
      const salt = genSaltSync(10);
      hashedPassword = hashSync(password, salt);
    }

    // Update the admin in the database and mark as deleted
    const updateQuery =
      "UPDATE tbladmin SET  is_deleted = ? WHERE admin_id = ?";
    const updateValues = [true, adminId];

    const [updateResult] = await pool
      .promise()
      .query(updateQuery, updateValues);

    console.log("Admin marked as deleted:", updateResult);

    res.json({ message: "Admin marked as deleted" });
  } catch (error) {
    console.error("Error marking admin as deleted:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
    });
  }
}

async function restoreAdmin(req, res) {
  try {
    const { adminId } = req.params;

    const checkQuery =
      "SELECT * FROM tbladmin WHERE admin_id = ? AND is_deleted = 1";
    const checkValues = [adminId];
    const [checkRows] = await pool.promise().query(checkQuery, checkValues);

    if (!Array.isArray(checkRows) || checkRows.length === 0) {
      return res
        .status(404)
        .json({ message: "Admin not found or is not deleted" });
    }

    const restoreQuery =
      "UPDATE tbladmin SET is_deleted = 0 WHERE admin_id = ?";
    const restoreValues = [adminId];

    const [restoreResult] = await pool
      .promise()
      .query(restoreQuery, restoreValues);

    console.log("Admin restored successfully:", restoreResult);

    res.json({ message: "Admin restored successfully" });
  } catch (error) {
    console.error("Error restoring admin:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
    });
  }
}

module.exports = {
  loginAdmin,
  getAllAdmins,
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  restoreAdmin,
};
