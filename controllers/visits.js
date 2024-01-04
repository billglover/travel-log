const visitsModel = require("../models/visits");

exports.list = async (req, res) => {
  const visits = await visitsModel.get_all(req.authInfo.user_id);
  return res.json(visits);
};

exports.get = async (req, res) => {
  const visit = await visitsModel.get_by_id(
    req.params.id,
    req.authInfo.user_id
  );
  return res.json(visit);
};

exports.create = async (req, res) => {
  console.log(req.body);
  console.log(req.authInfo, "user_id");
  try {
    // TODO: figure out a way to check that id isn't contained in body at all
    if (req.body.id !== undefined) {
      return res.status(400).send("Bad Reqest, should not include id");
    }
    // TODO: check userID in req matches the userID in the token
    if (req.body.user_id !== req.authInfo.user_id) {
      return res.status(401).send("Unauthorized, user_id does not match token");
    }
    const visit = await visitsModel.create(
      req.authInfo.user_id,
      req.body.country_id,
      req.body.arrival_time,
      req.body.departure_time
    );
    return res.status(201).json(visit);
  } catch (err) {
    if (err instanceof visitsModel.ConstraintIdNullError) {
      err.status = 400;
    } else {
      console.log("unable to create visit:", err);
      err.message = "unable to create visit";
    }
    throw err;
  }
  exports.delete;
};
