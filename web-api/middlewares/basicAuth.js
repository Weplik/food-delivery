const { Client } = require('../../libs/db/models');
const RequestError = require('../helpers/requestError');

const basicAuth = async (req, res, next) => {
  const basic = req.get('Authorization')
    ? req.get('Authorization').split(' ')[1]
    : null;

  if (!basic) {
    throw new RequestError(401, 'Not found Authorization header');
  }

  const [email, password] = Buffer.from(basic, 'base64')
    .toString()
    .split(':');

  const client = await Client.findOne({ where: { email } });

  if (!client) {
    throw new RequestError(401, 'Not found client');
  }

  const isCorrectPassword = await client.isCorrectPassword(password);

  if (!isCorrectPassword) {
    throw new RequestError(401, 'Wrong password');
  }

  req.user = client;

  next();
};

module.exports = basicAuth;
