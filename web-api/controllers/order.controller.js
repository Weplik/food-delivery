const router = require('express').Router();
const service = require('../services/order.service');

router.get('/', service.getOrders);

module.exports = router;
