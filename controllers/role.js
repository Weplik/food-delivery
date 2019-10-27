const router = require('express').Router();
const service = require('../services/role');

router.get('/', service.getRoles);

module.exports = router;
