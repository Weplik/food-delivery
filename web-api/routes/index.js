const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const clientController = require('../controllers/client.controller');
const orderContoller = require('../controllers/order.controller');
const productController = require('../controllers/product.controller');
const basicAuth = require('../middlewares/basicAuth');

router.use('/auth', authController);

router.use('/clients', basicAuth, clientController);

router.use('/orders', basicAuth, orderContoller);

router.use('/products', productController);

module.exports = router;
