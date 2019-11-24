const {
  Order,
  OrderItem,
  User,
  Product,
  Client,
  ClientAddress,
  sequelize,
} = require('../models');
const RequestError = require('../helpers/requestError');

const getOrders = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: orders, count } = await Order.findAndCountAll({
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

  return res.json({ orders, count });
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

const toggleStatus = async (req, res) => {
  const { status } = req.body;
  const { id: orderId } = req.params;

  const existOrder = await Order.findByPk(orderId, {
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
  });

  if (!existOrder) {
    throw new RequestError(404, 'Order not found');
  }

  existOrder.set('status', status);

  await existOrder.save();

  return res.json(existOrder);
};

module.exports = {
  getOrders,
  createOrder,
  toggleStatus,
};
