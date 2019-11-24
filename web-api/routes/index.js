const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const clientController = require('../controllers/client.controller');
const orderContoller = require('../controllers/order.controller');
const basicAuth = require('../middlewares/basicAuth');

router.use('/auth', authController);

router.use('/clients', basicAuth, clientController);

router.use('/orders', basicAuth, orderContoller);

module.exports = router;
