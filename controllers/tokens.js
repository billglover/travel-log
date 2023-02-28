const tokensModel = require('../models/tokens');

exports.list = async (req, res) => {
  const tokens = await tokensModel.get_all_tokens();
  return res.json(tokens);
};

exports.get = async (req, res) => {
  const token = await tokensModel.get_token_by_user_id(req.params.user_id);
  return res.json(token);
};
