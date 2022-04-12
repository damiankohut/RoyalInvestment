// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

 require('dotenv');
 module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'royal_investments',
      user: 'postgres',
      password: 'damian'
    }
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {rejectUnauthorized: false}
    }
  }
};

