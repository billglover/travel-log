const visitsModel = require('../models/visits');

exports.list = async (req, res) => {
  const visits = await visitsModel.get_all();
  return res.json(visits);
};
