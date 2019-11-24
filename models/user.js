const bcrypt = require('bcrypt');
const { PASSWORD: config } = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'users',
      underscored: true,
    }
  );

  User.associate = function(models) {
    User.belongsTo(models.Role, {
      as: 'role',
      foreignKey: {
        name: 'roleId',
        allowNull: false,
      },
    });
  };

  User.prototype.isCorrectPassword = function(password) {
    console.log(password);
    console.log(this.password);
    return bcrypt.compare(password, this.password);
  };

  User.beforeCreate(
    (user, options) =>
      new Promise((resolve, reject) => {
        bcrypt.hash(user.password, config.salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            // eslint-disable-next-line no-param-reassign
            user.password = hash;
            resolve(user, options);
          }
        });
      })
  );

  return User;
};
