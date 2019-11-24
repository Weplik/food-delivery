const { User } = require('../../libs/db/models');
const RequestError = require('../helpers/requestError');

const basicAuth = async (req, res, next) => {
  const basic = req.get('Authorization')
    ? req.get('Authorization').split(' ')[1]
    : null;

  if (!basic) {
    throw new RequestError(401, 'Not found Authorization header');
  }

  const [username, password] = Buffer.from(basic, 'base64')
    .toString()
    .split(':');

  const user = await User.findByPk(username);

  if (!user) {
    throw new RequestError(401, 'Not found user');
  }

  const isCorrectPassword = await user.isCorrectPassword(password);

  if (!isCorrectPassword) {
    throw new RequestError(401, 'Wrong password');
  }

  next();
};

module.exports = basicAuth;
