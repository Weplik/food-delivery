module.exports = (sequelize, DataTypes) => {
  const Courier = sequelize.define(
    'Courier',
    {
      imei: {
        type: DataTypes.STRING,
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
      isEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      activeOrders: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: 'couriers',
      underscored: true,
    }
  );

  Courier.associate = function(models) {
    Courier.hasMany(models.Order, {
      foreignKey: 'courierId',
      sourceKey: 'id',
      as: 'orders',
    });
  };

  return Courier;
};
