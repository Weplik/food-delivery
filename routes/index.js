const router = require('express').Router();
const roleController = require('../controllers/role');
const userController = require('../controllers/user');
const clientController = require('../controllers/client');
const clientAddressController = require('../controllers/clientAddress');
const ingredientController = require('../controllers/ingredient');
const productController = require('../controllers/product');

router.use('/roles', roleController);

router.use('/users', userController);

router.use('/clients', clientController);

router.use('/clients-addresses', clientAddressController);

router.use('/ingredients', ingredientController);

router.use('/products', productController);

module.exports = router;
