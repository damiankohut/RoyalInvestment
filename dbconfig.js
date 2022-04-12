
const { Pool } = require('pg')


const connectionDevelopment = {
  user: 'postgres',
  database: 'royal_investmentstocks',
  password: '',                  // If you have a postgres password, write it here
  host: 'localhost',
  port: 5432
};
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// async function getTodo() {
//     const todo  = await pool.query('SELECT * FROM todo').then(result => {return (result.rows)})
//     console.log(todo)
// }

// getTodo();
const connectionProduction = {
  connectionString: process.env.DATABASE_URL, 
  ssl: {rejectUnauthorized: false}
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? connectionProduction : connectionDevelopment)

module.exports = pool;
 

