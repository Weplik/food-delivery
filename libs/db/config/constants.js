const NODE_ENV = process.env.NODE_ENV || 'development';

const PASSWORD = {
  salt: 8,
};

module.exports = {
  NODE_ENV,
  PASSWORD,
};
