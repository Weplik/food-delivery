const router = require('express').Router();
const service = require('../services/order.service');

router.get('/', service.getOrders);

router.post('/', service.createOrder);

router.put('/:id/toggle-status', service.toggleStatus);

module.exports = router;
