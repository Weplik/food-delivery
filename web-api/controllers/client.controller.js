const router = require('express').Router();
const service = require('../services/client.service');

router.put('/', service.updateClient);

router.post('/client-address/:id', service.createClientAddress);

router.put('/client-address/:id', service.disableClientAddress);

router.put('/change-password', service.changePassword);

module.exports = router;
