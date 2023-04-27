const express = require('express');
const passport = require('passport');
const visitsController = require('../controllers/visits');

const router = express.Router();

router.get('/', passport.authenticate('bearer', { session: false }), visitsController.list);
router.get('/:id', passport.authenticate('bearer', { session: false }), visitsController.get);
router.post('/', visitsController.create);

module.exports = router;
