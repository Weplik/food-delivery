const router = require('express').Router();
const service = require('../services/role.service');

router.get('/', service.getRoles);

router.post('/', service.createRole);

router.put('/:id', service.updateRole);

router.put('/:id/disable', service.disableRole);

router.put('/:id/enable', service.enableRole);

module.exports = router;
