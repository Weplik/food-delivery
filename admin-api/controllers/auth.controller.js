const router = require('express').Router();
const service = require('../services/auth.service');
const jwtAuth = require('../middlewares/jwtAuth');

router.post('/signIn', service.signIn);

router.get('/info', jwtAuth, service.info);

module.exports = router;
