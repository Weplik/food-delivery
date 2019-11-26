const router = require('express').Router();
const service = require('../services/product.service');

router.get('/', service.getProducts);

module.exports = router;
