const db = require('../db/db');

// get_all returns all the visits from the DB.
exports.get_all = async () => {
  const visits = await db('visits').select(['id', 'user_id', 'country_id']);
  return visits;
};

// get_by_id returns all info regarding a single visit
exports.get_by_id = async (id) => {
  const visit = await db('visits').where({ id }).first(['id', 'user_id', 'country_id', 'arrival_time', 'departure_time']);

  // Parse dates in the DB from strings to number (seconds since UNIX epoch)
  const atTs = Date.parse(visit.arrival_time);
  const dtTs = Date.parse(visit.departure_time);

  // Conver these numbers to dates
  const at = new Date(atTs);
  const dt = new Date(dtTs);

  // we can now log these
  visit.arrival_time = at.toISOString();
  visit.departure_time = dt.toISOString();
  return visit;
};
