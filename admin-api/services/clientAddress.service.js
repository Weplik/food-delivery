const { Client, ClientAddress } = require('../../libs/db/models');
const RequestError = require('../helpers/requestError');

const createClientAddress = async (req, res) => {
  const address = req.body;

  const client = await Client.findByPk(address.clientId);

  if (!client) {
    throw new RequestError(404, 'Client not found');
  }

  const createdAddress = await ClientAddress.create(address);

  return res.json(createdAddress);
};

module.exports = {
  createClientAddress,
};
