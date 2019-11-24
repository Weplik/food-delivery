const { Client, ClientAddress } = require('../../libs/db/models');
const { RequestError } = require('../helpers/requestError');

const updateClient = async (req, res) => {
  const { phoneNumber, lastname, firstname } = req.body;
  const { id: clientId } = req.user;

  const client = await Client.findByPk(clientId, {
    attributes: { exclude: ['password'] },
  });

  console.log(client);

  client.set('phoneNumber', phoneNumber);
  client.set('lastname', lastname);
  client.set('firstname', firstname);

  await client.save();

  return res.json(client);
};

const createClientAddress = async (req, res) => {
  const address = req.body;
  const { id: clientId } = req.params;

  const savedAddress = await ClientAddress.create({ ...address, clientId });

  return res.json(savedAddress);
};

const disableClientAddress = async (req, res) => {
  const { id: clientAddressId } = req.params;

  const existClientAddress = await ClientAddress.findByPk(clientAddressId);

  if (!existClientAddress) {
    throw new RequestError(404, 'Client address not found');
  }

  existClientAddress.set('isEnabled', false);

  await ClientAddress.save();

  return res.json(existClientAddress);
};

const changePassword = async (req, res) => {
  const { password } = req.body;
  const { id: clientId } = req.user;

  const existClient = await Client.findByPk(clientId, {
    attributes: { exclude: ['password'] },
  });

  existClient.set('password', password);

  await existClient.save();

  delete existClient.password;

  return res.json(existClient);
};

module.exports = {
  updateClient,
  createClientAddress,
  disableClientAddress,
  changePassword,
};
