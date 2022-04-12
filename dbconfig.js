
const { Pool } = require('pg')


const connectionDevelopment = {
  user: 'postgres',
  database: 'royal_investments',
  password: 'damian',                  // If you have a postgres password, write it here
  host: 'localhost',
  port: 5432
};

const connectionProduction = {
  connectionString: process.env.DATABASE_URL, 
  ssl: {rejectUnauthorized: false}
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? connectionProduction : connectionDevelopment)

module.exports = pool;
 

