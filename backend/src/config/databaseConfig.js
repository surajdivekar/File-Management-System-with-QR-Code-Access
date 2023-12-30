const { createPool } = require("mysql2");

const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DBL_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

module.exports = pool;
