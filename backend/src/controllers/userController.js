const { genSaltSync, hashSync } = require("bcrypt");
const pool = require("../config/databaseConfig");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function userLogin(req, res) {
  try {
    const { user_email, password } = req.body;

    const query =
      "SELECT * FROM tbluser WHERE user_email = ? AND is_deleted = 0";
    const values = [user_email];

    const [rows] = await pool.promise().query(query, values);

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = rows[0];

    if (!compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = jwt.sign(
      { user_id: user.user_id, user_email: user.user_email },
      process.env.USER_ACCESS_TOKEN_SECRET
      // {
      //   expiresIn: "1h", // You can adjust the expiration time
      // }
    );

    res.json({ user, accessToken });
  } catch (error) {
    console.error("Error during user login:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
}

async function getAllUsers(req, res) {
  try {
    const [rows] = await pool
      .promise()
      .query("SELECT * FROM tbluser WHERE is_deleted = 0");

    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error("Query result is not an array or is empty");
    }

    console.log("Query Result:", rows);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);

    console.error("SQL Query:", "SELECT * FROM tbluser WHERE is_deleted = 0");

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
}

async function createUser(req, res) {
  try {
    const { user_name, user_email, user_mbno, password, admin_id } = req.body;

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const query =
      "INSERT INTO tbluser (user_name, user_email, user_mbno, password, admin_id, is_deleted) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      user_name,
      user_email,
      user_mbno,
      hashedPassword,
      admin_id,
      0,
    ];

    const [result] = await pool.promise().query(query, values);

    console.log("User created successfully:", result);

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM tbluser WHERE user_id = ? AND is_deleted = 0";
    const values = [id];

    console.log("Query:", query, values);

    const [rows] = await pool.promise().query(query, values);

    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    console.log("User found:", user);

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
}

// async function updateUser(req, res) {
//   try {
//     const { user_id, user_name, user_email, user_mbno, password, admin_id } =
//       req.body;

//     const checkQuery =
//       "SELECT * FROM tbluser WHERE user_id = ? AND is_deleted = 0";
//     const checkValues = [user_id];
//     const [checkRows] = await pool.promise().query(checkQuery, checkValues);

//     if (!Array.isArray(checkRows) || checkRows.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     let hashedPassword = checkRows[0].password;
//     if (password) {
//       const salt = genSaltSync(10);
//       hashedPassword = hashSync(password, salt);
//     }

//     const updateQuery =
//       "UPDATE tbluser SET user_name = ?, user_email = ?, user_mbno = ?, password = ?, admin_id = ? WHERE user_id = ? AND is_deleted = 0";
//     const updateValues = [
//       user_name,
//       user_email,
//       user_mbno,
//       hashedPassword,
//       admin_id,
//       user_id,
//     ];

//     const [updateResult] = await pool
//       .promise()
//       .query(updateQuery, updateValues);

//     console.log("User updated successfully:", updateResult);

//     res.json({ message: "User updated successfully" });
//   } catch (error) {
//     console.error("Error updating user:", error);

//     res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message || "Unknown error",
//     });
//   }
// }
async function updateUser(req, res) {
  try {
    const { user_id, user_name, user_email, user_mbno, password, admin_id } =
      req.body;

    // Check if the user exists and is not deleted
    const checkQuery =
      "SELECT * FROM tbluser WHERE user_id = ? AND is_deleted = 0";
    const checkValues = [user_id];
    const [checkRows] = await pool.promise().query(checkQuery, checkValues);

    // If the user doesn't exist, return a 404 response
    if (!Array.isArray(checkRows) || checkRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize variables to store the fields and values to be updated
    const fieldsToUpdate = [];
    const updateValues = [];

    // Check each field and add it to the update query if it exists in the request
    if (user_name !== undefined) {
      fieldsToUpdate.push("user_name = ?");
      updateValues.push(user_name);
    }

    if (user_email !== undefined) {
      fieldsToUpdate.push("user_email = ?");
      updateValues.push(user_email);
    }

    if (user_mbno !== undefined) {
      fieldsToUpdate.push("user_mbno = ?");
      updateValues.push(user_mbno);
    }

    if (password !== undefined) {
      const salt = genSaltSync(10);
      const hashedPassword = hashSync(password, salt);
      fieldsToUpdate.push("password = ?");
      updateValues.push(hashedPassword);
    }

    if (admin_id !== undefined) {
      fieldsToUpdate.push("admin_id = ?");
      updateValues.push(admin_id);
    }

    // Construct the dynamic update query
    const updateQuery = `UPDATE tbluser SET ${fieldsToUpdate.join(
      ", "
    )} WHERE user_id = ? AND is_deleted = 0`;
    updateValues.push(user_id);

    // Execute the dynamic update query
    const [updateResult] = await pool
      .promise()
      .query(updateQuery, updateValues);

    console.log("User updated successfully:", updateResult);

    res.json({ message: "User updated successfully" });
  } catch (error) {
    // Handle errors that occur during the user update
    console.error("Error updating user:", error);

    // Send a detailed error response for debugging
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params;

    const checkQuery = "SELECT * FROM tbluser WHERE user_id = ?";
    const checkValues = [userId];
    const [checkRows] = await pool.promise().query(checkQuery, checkValues);

    if (!Array.isArray(checkRows) || checkRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateQuery =
      "UPDATE tbluser SET is_deleted = 1 WHERE user_id = ? AND is_deleted = 0";
    const updateValues = [userId];

    const [updateResult] = await pool
      .promise()
      .query(updateQuery, updateValues);

    console.log("User marked as deleted:", updateResult);

    res.json({ message: "User marked as deleted" });
  } catch (error) {
    console.error("Error marking user as deleted:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
}

async function restoreUser(req, res) {
  try {
    const { userId } = req.params;

    const checkQuery =
      "SELECT * FROM tbluser WHERE user_id = ? AND is_deleted = 1";
    const checkValues = [userId];
    const [checkRows] = await pool.promise().query(checkQuery, checkValues);

    if (!Array.isArray(checkRows) || checkRows.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found or is not deleted" });
    }

    const restoreQuery =
      "UPDATE tbluser SET is_deleted = 0 WHERE user_id = ? AND is_deleted = 1";
    const restoreValues = [userId];

    const [restoreResult] = await pool
      .promise()
      .query(restoreQuery, restoreValues);

    console.log("User restored successfully:", restoreResult);

    res.json({ message: "User restored successfully" });
  } catch (error) {
    console.error("Error restoring user:", error);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
}

module.exports = {
  userLogin,
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  restoreUser,
};
