const { sign } = require('jsonwebtoken');
const { JWT } = require('../config/constants');

const generateAccessToken = username => {
  const accessToken = sign({ username }, JWT.secret, JWT.access);

  return accessToken;
};

module.exports = {
  generateAccessToken,
};
