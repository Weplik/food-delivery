const router = require('express').Router();
const roleController = require('../controllers/role');
const userController = require('../controllers/user');
const clientController = require('../controllers/client');
const clientAddressController = require('../controllers/clientAddress');
const ingredientController = require('../controllers/ingredient');

router.use('/role', roleController);

router.use('/user', userController);

router.use('/client', clientController);

router.use('/clients-address', clientAddressController);

router.use('/ingredient', ingredientController);

module.exports = router;
