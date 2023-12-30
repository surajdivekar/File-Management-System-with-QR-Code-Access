process.env.NODE_ENV = "development";
var cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const loginRoutes = require("./routes/loginRoutes");
// Serve static files from the "public" directory
const PORT = process.env.PORT || 9091;
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());

// const pool = mysql.createPool(dbConfig);

// app.use("/api/admins", adminRoutes(pool));
app.use(express.static("public"));

app.use("/api/admins", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/login", loginRoutes);
// app.use("/api/users", userRoutes(pool));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
