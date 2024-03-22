const db = require('../db/db');
/* eslint max-classes-per-file: ["error", 2] */

class ConstraintIdNullError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConstraintIdNullError';
  }
}
exports.ConstraintIdNullError = ConstraintIdNullError;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'NotFoundError';
  }
}
exports.NotFoundError = NotFoundError;

// get_all returns all the visits from the DB.
exports.get_all = async (userId) => {
  const visits = await db('visits')
    .join('countries', 'visits.country_id', '=', 'countries.id')
    .select(['visits.id', 'user_id', 'country_id', 'name'])
    .where({ 'visits.user_id': userId });
  console.log('all visits', visits);
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
    newVisits.push(visits2);
  });
  console.log(newVisits);
  return newVisits;
};

// get_by_id returns all info regarding a single visit
exports.get_by_id = async (id, userId) => {
  console.log('typeof id is', typeof id);
  console.log('typeof userId is', typeof userId);
  const visit = await db('visits')
    .join('countries', 'visits.country_id', '=', 'countries.id')
    .where({ 'visits.id': id }, { 'visits.user_id': userId })
    .first();
  // 'departure_time',
  // );
  console.log('model-visits', visit);
  if (visit === undefined) {
    throw new NotFoundError('visit not found');
  }
  // Parse dates in the DB from strings to number (seconds since UNIX epoch)

  const atTs = Date.parse(visit.arrival_time);
  const dtTs = Date.parse(visit.departure_time);

  // Conver these numbers to dates
  const at = new Date(atTs);
  const dt = new Date(dtTs);
  // we can now log these
  visit.arrival_time = at.toISOString();
  visit.departure_time = dt.toISOString();
  /* const singleVisit = [];
  Object.entries(visit).map((entry) => {
    const key = entry[0];
    const value = entry[1];

    const nestedObject = {};
    nestedObject[key] = value;
    singleVisit.push(nestedObject);
    return singleVisit;
  });
  */
  const singleVisit = {
    id: visit.id,
    user_id: visit.user_id,
    country: { id: visit.country_id, name: visit.name },
    departure_time: visit.departure_time,
    arrival_time: visit.arrival_time,
  };
  return singleVisit;
};

// retrieves all visits via userId
exports.get_by_user_id = async (userId) => {
  // const visits = await db('visits', 'countries')
  //   .join('countries', 'visits.country_id', '=', 'countries.name')
  //   .where({ user_id: userId });
  const visits = await db('visits')
    .join('countries', 'countries.id', 'visits.country_id')
    .select('countries.name', 'visits.id')
    .where({ user_id: userId });
  return visits;
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
      throw new ConstraintIdNullError(
        `visit can't be created due to null user or country ID; userId='${userId}', countryId='${countryId}`,
      );
    } else {
      console.log('unable to create visit, SQLite error:', err);
      throw new Error('unable to create visit');
    }
  }
};

exports.delete_by_id = async (id) => {
  const deletedVisit = await db('visits').where({ id }).del();
  return deletedVisit;
};
