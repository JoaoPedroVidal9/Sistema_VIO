const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQLHOST || process.env.DB_HOST,

  user: process.env.MYSQLUSER || process.env.DB_USER,

  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,

  password: process.env.MYSQLDATABASE || process.env.DB_NAME,

  database: process.env.MYSQLPORT || 3306,
});

module.exports = pool;
