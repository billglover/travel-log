const express = require('express');
const passport = require('passport');
const tokensController = require('../controllers/tokens');

const router = express.Router();

router.get('/', passport.authenticate('bearer', { session: false }), tokensController.list);
router.get('/:user_id', passport.authenticate('bearer', { session: false }), tokensController.get);
module.exports = router;
