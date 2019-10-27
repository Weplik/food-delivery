const error = (err, req, res, next) => {
  const httpCode = err.httpCode || 500;
  const message = err.message || 'Internal server error';
  const { errors } = err;

  console.error(`[${req.originalUrl}][${httpCode}] ${message}`);
  return res.status(httpCode).json({ message, errors });
};

module.exports = error;
