require('dotenv').config();
const { Pool } = require('pg')


const connectionDevelopment = {
  user: 'kayla',
  database: 'userAuth',
  password: '123',                  // If you have a postgres password, write it here
  host: 'localhost',
  port: 5432
};

const connectionProduction = {
  connectionString: process.env.DATABASE_URL, 
  ssl: {rejectUnauthorized: false}
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? connectionProduction : connectionDevelopment)

module.exports = pool;
 

