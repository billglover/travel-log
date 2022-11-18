const db = require('../db/db');

class ConstraintIdNullError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConstraintIdNullError';
  }
}
exports.ConstraintIdNullError = ConstraintIdNullError;

// get_all returns all the visits from the DB.
exports.get_all = async () => {
  const visits = await db('visits')
    .join('countries', 'visits.country_id', '=', 'countries.id')
    .select(['visits.id', 'user_id', 'country_id', 'name']);
  const newVisits = [];
  visits.forEach((properties) => {
    const visits2 = {
      id: properties.id,
      user: { id: properties.user_id },
      country: { id: properties.country_id, name: properties.name },
    };
    if (typeof properties.user_id !== 'number') {
      return;
    }
  });
  console.log(newVisits);
  return newVisits;
};

// get_by_id returns all info regarding a single visit
exports.get_by_id = async (id) => {
  const visit = await db('visits', 'countries')
    .where({ id })
    .first(['id', 'user_id', 'country_id', 'arrival_time', 'departure_time'])
    .select(['name']);

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

// creates & saves a new visit in SQLite DB
exports.create = async (userId, countryId, arrivalTime, departureTime) => {
  try {
    const atTs = Date.parse(arrivalTime);
    const dtTs = Date.parse(departureTime);
    const at = new Date(atTs);
    const dt = new Date(dtTs);

    const inserted = await db('visits').returning('id').insert({
      user_id: userId,
      country_id: countryId,
      arrival_time: at.toISOString(),
      departure_time: dt.toISOString(),
    });
    const visit = {
      id: inserted[0].id,
      user_id: userId,
      country_id: countryId,
      arrival_time: at.toISOString(),
      departure_time: dt.toISOString(),
    };
    return visit;
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      throw new ConstraintIdNullError(`visit can't be created due to null user or country ID; userId='${userId}', countryId='${countryId}`);
    } else {
      console.log('unable to create visit, SQLite error:', err);
      throw new Error('unable to create visit');
    }
  }
};
