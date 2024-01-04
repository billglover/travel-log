const express = require('express');
const passport = require('passport');
const visitsController = require('../controllers/visits');

const router = express.Router();

<<<<<<< Updated upstream
router.get('/', passport.authenticate('bearer', { session: false }), visitsController.list);
router.get('/:id', passport.authenticate('bearer', { session: false }), visitsController.get);
router.post('/', passport.authenticate('bearer', { session: false }), visitsController.create);

=======
router.get(
  '/',
  passport.authenticate('bearer', { session: false }),
  visitsController.list,
);
router.get(
  '/:id',
  passport.authenticate('bearer', { session: false }),
  visitsController.get,
);
router.post(
  '/',
  passport.authenticate('bearer', { session: false }),
  visitsController.create,
);
router.delete(
  '/:id',
  passport.authenticate('bearer', { session: false }),
  visitsController.delete,
);
router.get(
  '/new',
  passport.authenticate('bearer', { session: false }),
  visitsController.list,
);
>>>>>>> Stashed changes
module.exports = router;
