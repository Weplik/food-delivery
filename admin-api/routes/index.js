const router = require('express').Router();
const roleController = require('../controllers/role.controller');
const userController = require('../controllers/user.controller');
const clientController = require('../controllers/client.contoller');
const clientAddressController = require('../controllers/clientAddress.controller');
const ingredientController = require('../controllers/ingredient.controller');
const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');
const courierController = require('../controllers/courier.controller');
const jwtAuth = require('../middlewares/jwtAuth');

router.use('/roles', jwtAuth, roleController);

router.use('/users', jwtAuth, userController);

router.use('/clients', jwtAuth, clientController);

router.use('/clients-addresses', jwtAuth, clientAddressController);

router.use('/ingredients', jwtAuth, ingredientController);

router.use('/products', jwtAuth, productController);

router.use('/orders', jwtAuth, orderController);

router.use('/auth', authController);

router.use('/couriers', jwtAuth, courierController);

module.exports = router;
