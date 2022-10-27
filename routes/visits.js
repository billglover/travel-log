const express = require('express');
const visitsController = require('../controllers/visits');

const router = express.Router();

router.get('/', visitsController.list);
router.get('/:id', visitsController.get);

module.exports = router;
