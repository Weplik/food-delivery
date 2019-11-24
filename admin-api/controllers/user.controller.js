const router = require('express').Router();
const service = require('../services/user.service');

router.get('/', service.getUsers);

router.post('/', service.createUser);

router.put('/:username', service.updateUser);

router.put('/:username/disable', service.disableUser);

router.put('/:username/enable', service.enableUser);

module.exports = router;
