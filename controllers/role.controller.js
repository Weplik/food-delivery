const router = require('express').Router();
const service = require('../services/role.service');

router.get('/', service.getRoles);

module.exports = router;
