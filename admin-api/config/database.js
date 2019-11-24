const { NODE_ENV } = require('./constants');

const config = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'food_delivery_db',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: 'postgres',
    database: 'food_delivery_db',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};

module.exports = config[NODE_ENV];
