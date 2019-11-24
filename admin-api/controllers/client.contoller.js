const router = require('express').Router();
const service = require('../services/client.service');

router.get('/', service.getClients);

router.post('/', service.createClient);

module.exports = router;
