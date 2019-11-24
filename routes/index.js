const router = require('express').Router();
const roleController = require('../controllers/role.controller');
const userController = require('../controllers/user.controller');
const clientController = require('../controllers/client.contoller');
const clientAddressController = require('../controllers/clientAddress.controller');
const ingredientController = require('../controllers/ingredient.controller');
const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');
const basicAuth = require('../middlewares/basicAuth');

router.use('/roles', basicAuth, roleController);

router.use('/users', basicAuth, userController);

router.use('/clients', basicAuth, clientController);

router.use('/clients-addresses', basicAuth, clientAddressController);

router.use('/ingredients', basicAuth, ingredientController);

router.use('/products', basicAuth, productController);

router.use('/orders', basicAuth, orderController);

router.use('/auth', basicAuth, authController);

module.exports = router;
