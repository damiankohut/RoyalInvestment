// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

 module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'userAuth',
      user: 'kayla',
      password: '123'
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

