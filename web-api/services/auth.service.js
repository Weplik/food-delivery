const { Client } = require('../../libs/db/models');
const RequestError = require('../helpers/requestError');

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const client = await Client.findOne({ where: { email } });

  if (!client) {
    throw new RequestError(404, 'Client not found');
  }

  const isCorrectPassword = await client.isCorrectPassword(password);

  if (!isCorrectPassword) {
    throw new RequestError(401, 'Wrong password');
  }

  return res.json(client);
};

const signUp = async (req, res) => {
  const { email, ...client } = req.body;

  const existClient = await Client.findOne({ where: { email } });

  if (existClient) {
    throw new RequestError(400, 'Client is exist');
  }

  const savedClient = await Client.create({ ...client, email });

  return res.json(savedClient);
};

module.exports = {
  signIn,
  signUp,
};
