const router = require('express').Router();
const service = require('../services/client');

router.get('/', service.getClients);

router.post('/', service.createClient);

module.exports = router;