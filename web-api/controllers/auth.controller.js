const router = require('express').Router();
const service = require('../services/auth.service');

router.post('/sign-in', service.signIn);

router.post('/sign-up', service.signUp);

module.exports = router;
