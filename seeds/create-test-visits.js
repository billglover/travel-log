/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function seed(knex) {
  await knex('visits').del();
  await knex('visits').insert([
    {
      user_id: 1, country_id: 1, arrival_time: '2022-10-27T09:27:24.000Z', departure_time: '2022-10-27T09:27:25.000Z',
    },
    {
      user_id: 2, country_id: 1, arrival_time: '2022-09-27 09:27:24.000Z', departure_time: '2022-11-27 09:27:24.000Z',
    },
  ]);
};
