module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      comment: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM(['NEW']),
        defaultValue: 'NEW',
      },
    },
    {
      tableName: 'orders',
      underscored: true,
    }
  );

  Order.associate = function(models) {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      sourceKey: 'id',
      as: 'items',
    });

    Order.belongsTo(models.User, {
      foreignKey: 'operatorUsername',
      sourceKey: 'username',
      as: 'operator',
    });

    Order.belongsTo(models.Client, {
      foreignKey: 'clientId',
      sourceKey: 'id',
      as: 'client',
    });

    Order.belongsTo(models.ClientAddress, {
      foreignKey: 'clientAddressId',
      sourceKey: 'id',
      as: 'address',
    });

    Order.belongsTo(models.Courier, {
      foreignKey: 'courierId',
      sourceKey: 'id',
      as: 'courier',
    });
  };

  return Order;
};
