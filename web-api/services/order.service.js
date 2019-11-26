const {
  Order,
  OrderItem,
  Product,
  ClientAddress,
  sequelize,
} = require('../../libs/db/models');

const getOrders = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;
  const { id: clientId } = req.user;

  const { rows: orders, count } = await Order.findAndCountAll({
    where: {
      clientId,
    },
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
        model: ClientAddress,
        as: 'address',
      },
    ],
    attributes: {
      exclude: ['courierId', 'operatorUsername', 'clientId'],
    },
    limit,
    offset,
  });

  return res.json({ orders, count });
};

const createOrder = async (req, res) => {
  const { items, ...order } = req.body;
  const { id: clientId } = req.user;

  const savedOrder = await sequelize.transaction(transaction =>
    Order.create(
      {
        ...order,
        clientId,
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
