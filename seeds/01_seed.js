/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    { name: "kayla", email: "kaylaedwards575", password: "abc", account_balance: 1500},
    { name: "kazon", email: "kazgmail", password: "bed", account_balance: 1500},
    {name: "kwami", email: "kwagmail", password: "young", account_balance: 1500}
  ]);
};
