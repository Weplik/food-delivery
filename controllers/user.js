const router = require('express').Router();
const service = require('../services/user');

router.get('/', service.getUsers);

module.exports = router;