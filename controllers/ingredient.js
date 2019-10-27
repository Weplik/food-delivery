const router = require('express').Router();
const service = require('../services/ingredient');

router.get('/', service.getIngredients);

router.post('/', service.createIngredient);

router.put('/', service.updateIngredient);

module.exports = router;
