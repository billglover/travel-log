const db = require('../db/db');

// returns all tokens from database
exports.get_all_tokens = async () => {
  const tokens = await db('tokens').select(['user_id', 'bearer_token']);
  return tokens;
};

// returns 1 token based on user_id
exports.get_token_by_user_id = async (userId) => {
  console.log(userId);
  const token = await db('tokens')
    .where({ 'tokens.user_id': userId })
    .first(['user_id', 'bearer_token']);
  return token;
};
