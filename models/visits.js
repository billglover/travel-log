const db = require('../db/db');

// get_all returns all the visits from the DB.
exports.get_all = async () => {
  const visits = await db('visits').select(['id', 'user_id', 'country_id']);
  return visits;
};

// get_by_id returns all info regarding a single visit
exports.get_by_id = async (id) => {
  const visit = await db('visits').where({ id }).first(['id', 'user_id', 'country_id', 'arrival_time', 'departure_time']);
  visit.arrival_time = visit.arrival_time.toISOString();
  visit.departure_time = visit.departure_time.toISOString();
  return visit;
};
