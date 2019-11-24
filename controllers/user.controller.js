const router = require('express').Router();
const service = require('../services/user.service');

router.get('/', service.getUsers);

router.post('/', service.createUser);

module.exports = router;
