const NODE_ENV = process.env.NODE_ENV || 'development';

const APP_PORT = process.env.APP_PORT || 8000;

const PASSWORD = {
  salt: 8,
};

const JWT = {
  secret: 'djuqi@#@#',
  access: {
    expiresIn: 86400,
  },
};

module.exports = {
  NODE_ENV,
  APP_PORT,
  PASSWORD,
  JWT,
};
