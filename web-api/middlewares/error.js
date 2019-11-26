const logger = require('../helpers/logger');

const error = (err, req, res, next) => {
  const httpCode = err.httpCode || 500;
  const message = err.message || 'Internal server error';
  const { errors } = err;

  logger.error({ url: req.originalUrl, httpCode, message });

  return res.status(httpCode).json({ message, errors });
};

module.exports = error;
