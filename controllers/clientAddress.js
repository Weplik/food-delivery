const router = require('express').Router();
const service = require('../services/clientAddress');

router.post('/', service.createClientAddress);

module.exports = router;
