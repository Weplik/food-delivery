const { Ingredient, Sequelize } = require('../../libs/db/models');

const calculateProductItem = async productItems => {
  const ingredientIds = productItems.map(item => item.ingredientId);

  const ingredients = await Ingredient.findAll({
    where: { id: { [Sequelize.Op.in]: ingredientIds } },
  });

  if (ingredients.length !== ingredientIds.length) {
    throw new Error('One ot more ingredients not found');
  }

  productItems.forEach(item => {
    const [ingredient] = ingredients.filter(
      ingredientItem => ingredientItem.id === item.ingredientId
    );

    const primeCost = Math.round((ingredient.costPerKilo * item.weight) / 1000);

    // eslint-disable-next-line no-param-reassign
    item.primeCost = primeCost;
  });
};

module.exports = {
  calculateProductItem,
};
