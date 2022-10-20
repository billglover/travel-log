/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function seed(knex) {
  await knex('visits').del();
  await knex('visits').insert([
    {
      user_id: 1, country_id: 1, arrival_time: '04-26-1998', departure_time: '02-18-2019',
    },
    {
      user_id: 2, country_id: 1, arrival_time: '01-01-2008', departure_time: '02-01-2008',
    },
  ]);
};
