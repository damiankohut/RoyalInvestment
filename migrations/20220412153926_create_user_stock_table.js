/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_stocks', function (table) {
        table.increments("id").primary();
        table.string('tickername').notNullable();
        table.integer('quantity_of_stocks').notNullable();
        table.decimal('buy_price').notNullable();
        table.decimal('sell_price');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("user_stocks")
};
