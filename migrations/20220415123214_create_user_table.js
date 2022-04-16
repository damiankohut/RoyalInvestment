/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments("id").primary();
<<<<<<< HEAD:migrations/20220412153251_create_user_table.js
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.decimal("account_balance").notNullable();
=======
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.decimal('account_balance').notNullable();
>>>>>>> 323c7fa82ab2427979f7a7ca5efe641115549336:migrations/20220415123214_create_user_table.js
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("user")
};
