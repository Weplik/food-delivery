const { Ingredient, ProductItem } = require('../../libs/db/models');
const RequestError = require('../helpers/requestError');

const getIngredients = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: ingredients, count } = await Ingredient.findAndCountAll({
    limit,
    offset,
  });

  return res.json({
    ingredients,
    count,
  });
};

const createIngredient = async (req, res) => {
  const ingredient = req.body;

  const savedIngredient = await Ingredient.create(ingredient);

  return res.json(savedIngredient);
};

const updateIngredient = async (req, res) => {
  const { id, ...ingredient } = req.body;

  const existIngredient = await Ingredient.findByPk(id);

  if (!existIngredient) {
    throw new RequestError(404, 'Ingredient not found');
  }

  await existIngredient.update(ingredient);

  return res.json(existIngredient);
};

const disableIngredient = async (req, res) => {
  const id = req.params;

  const existIngredient = await Ingredient.findByPk(id);

  if (!existIngredient) {
    throw new RequestError(404, 'Ingredient not found');
  }

  const items = await ProductItem.findAll({ where: { id } });

  if (items.length) {
    throw new RequestError(400, 'Ingredient is busy');
  }

  existIngredient.set('isEnabled', false);

  await existIngredient.save();

  return res.json(existIngredient);
};

const enableIngredient = async (req, res) => {
  const id = req.params;

  const existIngredient = await Ingredient.findByPk(id);

  if (!existIngredient) {
    throw new RequestError(404, 'Ingredient not found');
  }

  existIngredient.set('isEnabled', true);

  await existIngredient.save();

  return res.json(existIngredient);
};

module.exports = {
  getIngredients,
  createIngredient,
  updateIngredient,
  disableIngredient,
  enableIngredient,
};
