const router = require('express').Router();
const service = require('../services/auth.service');

router.post('/login', service.login);

module.exports = router;
