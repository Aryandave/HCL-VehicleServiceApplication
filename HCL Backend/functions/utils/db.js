const { Pool } = require('pg');
const CustomError = require('./customError');
const { globalErrorHandler } = require('./errorHandler');

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME
});

module.exports = {
  query: async (text, params = []) => {
    try {
      return await pool.query(text, params)
    } catch (err) {
      globalErrorHandler(err);
      return err;
    }
  }
};