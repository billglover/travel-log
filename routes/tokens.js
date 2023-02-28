const express = require('express');
const tokensController = require('../controllers/tokens');

const router = express.Router();

router.get('/', tokensController.list);
router.get('/:user_id', tokensController.get);

module.exports = router;
