const countriesModel = require('../models/countries');

exports.list = async (req, res) => {
  const countries = await countriesModel.get_all();
  return res.json(countries);
};

exports.get = async (req, res) => {
  const country = await countriesModel.get_by_id(req.params.id);

  // TODO: return 404 if no country found
  return res.json(country);
};

exports.search = async (req, res) => {
  const country = await countriesModel.get_by_name(req.query.name);

  // TODO: return 404 if no country found
  return res.json(country);
};

exports.create = async (req, res) => {
  try {
    const country = await countriesModel.create(req.body.name);
    return res.status(201).json(country);
  } catch (err) {
    if (err instanceof countriesModel.CountryExistsError) {
      err.status = 400;
    } else {
      err.message = 'unable to create country';
    }
    throw err;
  }
};
