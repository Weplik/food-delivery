const { verify } = require('jsonwebtoken');
const RequestError = require('../helpers/requestError');
const { JWT } = require('../config/constants');

const jwtAuth = async (req, res, next) => {
  try {
    const header = req.get('Authorization');

    if (!header) {
      throw new RequestError(401, 'Not found Authorization header');
    }

    const token = header.split(' ').length < 2 ? null : header.split(' ')[1];

    if (!token) {
      throw new RequestError(401, 'Not found token');
    }

    req.user = verify(token, JWT.secret);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = jwtAuth;
