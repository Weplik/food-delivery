const router = require('express').Router();
const service = require('../services/clientAddress.service');

router.post('/', service.createClientAddress);

module.exports = router;
