// const bcrypt = require("bcrypt");
// const pool = require("../config/databaseConfig");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Convert email to lowercase for case-insensitive comparison
//     const lowercasedEmail = email.toLowerCase();

//     // Find user by email in the user table
//     const userQuery = "SELECT * FROM tbluser WHERE LOWER(user_email) = ?";
//     const [userResults] = await pool
//       .promise()
//       .query(userQuery, [lowercasedEmail]);

//     console.log("User Query Result:", userResults);

//     if (
//       userResults.length > 0 &&
//       (await bcrypt.compare(password, userResults[0].password))
//     ) {
//       console.log("User Password Hash:", userResults[0].password);
//       console.log("Provided Password:", password);

//       const token = jwt.sign(
//         { userId: userResults[0].id, role: "user" },
//         process.env.JWT_SECRET || "your-default-secret-key"
//         // { expiresIn: "1h" }
//       );

//       console.log("Generated Token:", token);

//       res.json({
//         token,
//         data: { email: userResults[0].user_email, role: "user" },
//       });
//       return;
//     }

//     // Find admin by email in the admin table
//     const adminQuery = "SELECT * FROM tbladmin WHERE LOWER(admin_email) = ?";
//     const [adminResults] = await pool
//       .promise()
//       .query(adminQuery, [lowercasedEmail]);

//     console.log("Admin Query Result:", adminResults);

//     if (
//       adminResults.length > 0 &&
//       (await bcrypt.compare(password, adminResults[0].password))
//     ) {
//       console.log("Admin Password Hash:", adminResults[0].password);
//       console.log("Provided Password:", password);

//       const token = jwt.sign(
//         { userId: adminResults[0].id, role: "admin" },
//         process.env.JWT_SECRET || "your-default-secret-key"
//         // { expiresIn: "1h" }
//       );

//       console.log("Generated Token:", token);

//       res.json({
//         token,
//         data: { email: adminResults[0].admin_email, role: "admin" },
//       });
//       return;
//     }

//     console.log("Invalid Credentials");

//     res.status(401).json({ error: "Invalid credentials" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const bcrypt = require("bcrypt");
const pool = require("../config/databaseConfig");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Convert email to lowercase for case-insensitive comparison
    const lowercasedEmail = email.toLowerCase();

    // Find user by email in the user table
    const userQuery = "SELECT * FROM tbluser WHERE LOWER(user_email) = ?";
    const [userResults] = await pool
      .promise()
      .query(userQuery, [lowercasedEmail]);

    if (
      userResults.length > 0 &&
      (await bcrypt.compare(password, userResults[0].password))
    ) {
      const token = jwt.sign(
        { userId: userResults[0].id, role: "user" },
        process.env.JWT_SECRET || "your-default-secret-key"
        // No expiresIn option (or set it to a very high value)
      );

      res.json({
        token,
        data: {
          id: userResults[0].user_id,
          email: userResults[0].user_email,
          role: "user",
        },
      });
      return;
    }

    // Find admin by email in the admin table
    const adminQuery = "SELECT * FROM tbladmin WHERE LOWER(admin_email) = ?";
    const [adminResults] = await pool
      .promise()
      .query(adminQuery, [lowercasedEmail]);

    if (
      adminResults.length > 0 &&
      (await bcrypt.compare(password, adminResults[0].password))
    ) {
      const token = jwt.sign(
        { userId: adminResults[0].id, role: "admin" },
        process.env.JWT_SECRET || "your-default-secret-key"
        // No expiresIn option (or set it to a very high value)
      );

      res.json({
        token,
        data: {
          id: adminResults[0].admin_id,
          email: adminResults[0].admin_email,
          role: "admin",
        },
      });
      return;
    }

    console.log("Invalid Credentials");

    res.status(401).json({ error: "Invalid credentials" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
