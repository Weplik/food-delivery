const router = require('express').Router();
const service = require('../services/auth.service');

router.post('/signIn', service.signIn);

module.exports = router;
