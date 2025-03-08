import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.TIDB_HOST,
  port: parseInt(process.env.TIDB_PORT || "4000"),
  user: process.env.TIDB_USERNAME,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: {
    rejectUnauthorized: false, // Bypass SSL verification
  },
});

export default pool;