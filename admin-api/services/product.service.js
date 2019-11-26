const {
  Product,
  ProductItem,
  sequelize,
  Ingredient,
} = require('../../libs/db/models');
const { calculateProductItem } = require('../utils/product.utils');
const RequestError = require('../helpers/requestError');

const getProducts = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const products = await Product.findAndCountAll({
    include: [
      {
        model: ProductItem,
        as: 'items',
        attributes: ['id', 'weight'],
        include: [
          {
            model: Ingredient,
            as: 'ingredient',
            attributes: ['id', 'title'],
          },
        ],
      },
    ],
    limit,
    offset,
  });

  return res.json(products);
};

const createProduct = async (req, res) => {
  const { items, ...product } = req.body;

  await calculateProductItem(items);

  product.primeCost = items
    .map(item => item.primeCost)
    .reduce((total, value) => total + value);

  product.weight = items
    .map(item => item.weight)
    .reduce((total, value) => total + value);

  const savedProduct = await sequelize.transaction(transaction =>
    Product.create(
      {
        ...product,
        items,
      },
      {
        include: [
          {
            model: ProductItem,
            as: 'items',
          },
        ],
        transaction,
      }
    )
  );

  return res.json(savedProduct);
};

const updateProduct = async (req, res) => {
  const { items, ...product } = req.body;
  const { id } = req.params;

  const existProduct = await Product.findByPk(id);

  if (!existProduct) {
    throw new RequestError(404, 'Product not found');
  }

  const newItems = items.map(item => ({
    ingredientId: item.ingredientId,
    productId: id,
    weight: item.weight,
  }));

  await calculateProductItem(newItems);

  product.primeCost = newItems
    .map(item => item.primeCost)
    .reduce((total, value) => total + value);

  product.weight = newItems
    .map(item => item.weight)
    .reduce((total, value) => total + value);

  // TODO I don't know how it's do otherwise
  await sequelize.transaction(transaction =>
    ProductItem.destroy({ where: { productId: id }, transaction }).then(() =>
      Promise.all([
        Product.update(product, { where: { id }, transaction }),
        ProductItem.bulkCreate(newItems, { transaction }),
      ])
    )
  );

  const savedProduct = await Product.findByPk(id, {
    include: [
      {
        model: ProductItem,
        as: 'items',
        attributes: ['id', 'weight'],
        include: [
          {
            model: Ingredient,
            as: 'ingredient',
            attributes: ['id', 'title'],
          },
        ],
      },
    ],
  });

  return res.json(savedProduct);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByPk(id, {
    include: [
      {
        model: ProductItem,
        as: 'items',
        attributes: ['id', 'weight'],
        include: [
          {
            model: Ingredient,
            as: 'ingredient',
            attributes: ['id', 'title'],
          },
        ],
      },
    ],
  });

  if (!product) {
    throw new RequestError(404, 'Product not found');
  }

  return res.json(product);
};

const disableProduct = async (req, res) => {
  const { id } = req.params;

  const existProduct = await Product.findByPk(id, {
    include: [
      {
        model: ProductItem,
        as: 'items',
        attributes: ['id', 'weight'],
        include: [
          {
            model: Ingredient,
            as: 'ingredient',
            attributes: ['id', 'title'],
          },
        ],
      },
    ],
  });

  if (!existProduct) {
    throw new RequestError(404, 'Product not found');
  }

  existProduct.set('isEnabled', false);

  await existProduct.save();

  return res.json(existProduct);
};

const enableProduct = async (req, res) => {
  const { id } = req.params;

  const existProduct = await Product.findByPk(id, {
    include: [
      {
        model: ProductItem,
        as: 'items',
        attributes: ['id', 'weight'],
        include: [
          {
            model: Ingredient,
            as: 'ingredient',
            attributes: ['id', 'title'],
          },
        ],
      },
    ],
  });

  if (!existProduct) {
    throw new RequestError(404, 'Product not found');
  }

  existProduct.set('isEnabled', true);

  await existProduct.save();

  return res.json(existProduct);
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  disableProduct,
  enableProduct,
};
