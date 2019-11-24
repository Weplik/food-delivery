const { Courier, Order, Client, ClientAddress } = require('../models');
const RequestError = require('../helpers/requestError');

const getCouriers = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: couriers, count } = await Courier.findAndCountAll({
    include: [
      {
        model: Order,
        as: 'orders',
        attributes: ['id', 'comment'],
        include: [
          {
            model: Client,
            as: 'client',
            attributes: ['id', 'firstname', 'lastname', 'phoneNumber'],
          },
          {
            model: ClientAddress,
            as: 'address',
            attributes: [
              'id',
              'street',
              'house',
              'floor',
              'flat',
              'isPrivateHouse',
            ],
          },
        ],
      },
    ],
    limit,
    offset,
  });

  return res.json({ couriers, count });
};

const createCourier = async (req, res) => {
  const courier = req.body;

  const existCourier = await Courier.findOne({ where: { imei: courier.imei } });

  if (existCourier) {
    throw new RequestError(400, 'Courier is exist');
  }

  const savedCourier = await Courier.create(courier);

  return res.json(savedCourier);
};

const updateCourier = async (req, res) => {
  const { imei, firstname, lastname } = req.body;
  const { id: courierId } = req.params;

  const existCourier = await Courier.findByPk(courierId);

  if (!existCourier) {
    throw new RequestError(404, 'Courier not found');
  }

  existCourier.set('imei', imei);
  existCourier.set('firstname', firstname);
  existCourier.set('lastname', lastname);

  await existCourier.save();

  return res.json(existCourier);
};

const disableCourier = async (req, res) => {
  const { id: courierId } = req.params;

  const existCourier = await Courier.findByPk(courierId);

  if (!existCourier) {
    throw new RequestError(404, 'Courier not found');
  }

  if (existCourier.activeOrders) {
    throw new RequestError(400, 'Courier has active orders');
  }

  existCourier.set('isEnabled', false);

  await existCourier.save();

  return res.json(existCourier);
};

const enableCourier = async (req, res) => {
  const { id: courierId } = req.params;

  const existCourier = await Courier.findByPk(courierId);

  if (!existCourier) {
    throw new RequestError(404, 'Courier not found');
  }

  existCourier.set('isEnabled', true);

  await existCourier.save();

  return res.json(existCourier);
};

module.exports = {
  getCouriers,
  createCourier,
  updateCourier,
  disableCourier,
  enableCourier,
};
