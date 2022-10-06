const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.list);
router.get('/:id', usersController.get);
router.post('/', usersController.create);

module.exports = router;
