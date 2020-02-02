const router = require('express').Router();
const service = require('../services/ingredient.service');

router.get('/', service.getIngredients);

router.post('/', service.createIngredient);

router.put('/:id', service.updateIngredient);

router.put('/:id/disable', service.disableIngredient);

router.put('/:id/enable', service.enableIngredient);

module.exports = router;
