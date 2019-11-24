module.exports = sequelize => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {},
    {
      tableName: 'orders_items',
      underscored: true,
    }
  );

  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.Product, {
      foreignKey: 'productId',
      sourceKey: 'id',
      as: 'product',
    });

    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      sourceKey: 'id',
      as: 'order',
    });
  };

  return OrderItem;
};
