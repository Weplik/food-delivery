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
      foreignKey: 'operator_username',
      sourceKey: 'username',
      as: 'operator',
    });

    Order.belongsTo(models.Client, {
      foreignKey: 'client_id',
      sourceKey: 'id',
      as: 'client',
    });

    Order.belongsTo(models.ClientAddress, {
      foreignKey: 'client_address_id',
      sourceKey: 'id',
      as: 'address',
    });
  };

  return Order;
};
