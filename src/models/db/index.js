import {
  Pool
} from 'pg';
import dotenv from 'dotenv';

let DB;
dotenv.config();

process.env.NODE_ENV = 'TEST' ? DB = process.env.TEST_URL : DB = process.env.DB_URL;

const pool = new Pool({
  connectionString: DB,
});

pool.on('connect', () => {
  console.log('connected to the database');
});

/**
 * DB Query
 * @param {object} text
 * @param {object} params
 * @returns {object} object
 */
const query = (text, params) => new Promise((resolve, reject) => {
  pool
    .query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

export default query;