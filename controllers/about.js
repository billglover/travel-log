const usersModel = require('../models/users');
exports.list = async (req, res) => {
  const users = await usersModel.get_all();
  console.log(req.authInfo, users, 'headers');
  return res.json(users);
};
