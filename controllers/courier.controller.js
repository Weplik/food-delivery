const router = require('express').Router();
const service = require('../services/courier.service');

router.get('/', service.getCouriers);

router.post('/', service.createCourier);

router.put('/:id', service.updateCourier);

router.put('/:id/disable', service.disableCourier);

router.put('/:id/enable', service.enableCourier);

module.exports = router;
