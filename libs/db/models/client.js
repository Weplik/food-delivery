const bcrypt = require('bcrypt');
const { PASSWORD: config } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      tableName: 'clients',
      underscored: true,
    }
  );

  Client.associate = function(models) {
    Client.hasMany(models.ClientAddress, {
      foreignKey: 'clientId',
      sourceKey: 'id',
      as: 'addresses',
    });
  };

  Client.prototype.isCorrectPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  Client.beforeCreate(
    (client, options) =>
      new Promise((resolve, reject) => {
        if (!client.password) {
          resolve(client, options);
        }

        bcrypt.hash(client.password, config.salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            // eslint-disable-next-line no-param-reassign
            client.password = hash;
            resolve(client, options);
          }
        });
      })
  );

  Client.beforeUpdate(
    (client, options) =>
      new Promise((resolve, reject) => {
        if (!client.password) {
          resolve(client, options);
        }

        bcrypt.hash(client.password, config.salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            // eslint-disable-next-line no-param-reassign
            client.password = hash;
            resolve(client, options);
          }
        });
      })
  );

  return Client;
};
