const { Product, ProductItem, Ingredient } = require('../../libs/db/models');

const getProducts = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: products, count } = await Product.findAndCountAll({
    include: [
      {
        model: ProductItem,
        as: 'items',
        attributes: ['id'],
        include: [
          {
            model: Ingredient,
            as: 'ingredient',
            attributes: ['title'],
          },
        ],
      },
    ],
    attributes: {
      exclude: ['primeCost', 'isEnabled'],
    },
    where: {
      isEnabled: true,
    },
    limit,
    offset,
  });

  return res.json({ products, count });
};

module.exports = {
  getProducts,
};
