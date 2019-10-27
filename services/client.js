const { Client, ClientAddress } = require('../models');
const RequestError = require('../helpers/requestError');

const getClients = async (req, res) => {
  const { limit = 20, offset = 0 } = req.query;

  const { rows: clients, count } = await Client.findAndCountAll({
    include: [
      {
        model: ClientAddress,
        as: 'addresses',
        attributes: ['id', 'address'],
      },
    ],
    limit,
    offset,
  });

  return res.json({ clients, count });
};

const createClient = async (req, res) => {
  const { client, address } = req.body;

  const existClient = await Client.findOne({
    where: {
      phoneNumber: client.phoneNumber,
    },
  });

  if (existClient) {
    throw new RequestError(400, 'Client is exist');
  }

  const savedClient = await Client.create(
    {
      ...client,
      addresses: [address],
    },
    {
      include: [
        {
          model: ClientAddress,
          as: 'addresses',
        },
      ],
    }
  );

  return res.json(savedClient);
};

module.exports = {
  getClients,
  createClient,
};
