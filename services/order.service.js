const {
  Order,
  OrderItem,
  User,
  Product,
  Client,
  ClientAddress,
  sequelize,
} = require('../models');

const getOrders = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const orders = await Order.findAndCountAll({
    include: [
      {
        model: OrderItem,
        as: 'items',
        attributes: ['id'],
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'title'],
          },
        ],
      },
      {
        model: User,
        as: 'operator',
        attributes: ['username'],
      },
      {
        model: Client,
        as: 'client',
      },
      {
        model: ClientAddress,
        as: 'address',
      },
    ],
    attributes: {
      exclude: ['operator_username', 'client_id', 'client_address_id'],
    },
    limit,
    offset,
  });

  return res.json(orders);
};

const createOrder = async (req, res) => {
  const { items, ...order } = req.body;
  // const { id: operator } = req.user;

  const savedOrder = await sequelize.transaction(transaction =>
    Order.create(
      {
        ...order,
        // operator,
        items,
      },
      {
        include: [
          {
            model: OrderItem,
            as: 'items',
          },
        ],
        transaction,
      }
    )
  );

  return res.json(savedOrder);
};

module.exports = {
  getOrders,
  createOrder,
};
