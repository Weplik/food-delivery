const router = require('express').Router();
const service = require('../services/product.service');

router.get('/', service.getProducts);

router.post('/', service.createProduct);

router.get('/:id', service.getProductById);

router.put('/:id', service.updateProduct);

router.put('/:id/disable', service.disableProduct);

router.put('/:id/enable', service.enableProduct);

module.exports = router;
