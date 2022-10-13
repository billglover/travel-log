const db = require('../db/db');

// get_all returns all the visits from the DB.
exports.get_all = async () => {
  const visits = await db('visits').select(['id', 'user_id', 'country_id']);
  return visits;
};
