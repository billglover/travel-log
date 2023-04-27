const visitsModel = require('../models/visits');

exports.list = async (req, res) => {
  const visits = await visitsModel.get_all();
  return res.json(visits);
};

exports.get = async (req, res) => {
  const visit = await visitsModel.get_by_id(req.params.id, req.authInfo.user_id);
  return res.json(visit);
};

exports.create = async (req, res) => {
  try {
    const visit = await visitsModel.create(
      req.body.user_id,
      req.body.country_id,
      req.body.arrival_time,
      req.body.departure_time,
    );
    return res.status(201).json(visit);
  } catch (err) {
    if (err instanceof visitsModel.ConstraintIdNullError) {
      err.status = 400;
    } else {
      console.log('unable to create visit:', err);
      err.message = 'unable to create visit';
    }
    throw err;
  }
};
