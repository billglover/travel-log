const visitsModel = require('../models/visits');

exports.list = async (req, res) => {
  const visits = await visitsModel.get_all();
  return res.json(visits);
};

exports.get = async (req, res) => {
  const visit = await visitsModel.get_by_id(req.params.id);
  return res.json(visit);
};
