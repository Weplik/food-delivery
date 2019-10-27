module.exports = (sequelize, DataTypes) => {
  const ClientAddress = sequelize.define(
    'ClientAddress',
    {
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      house: {
        type: DataTypes.STRING,
      },
      floor: {
        type: DataTypes.STRING,
      },
      flat: {
        type: DataTypes.STRING,
      },
      isPrivateHouse: {
        field: 'is_private_house',
        type: DataTypes.STRING,
        defaultValue: false,
      },
    },
    {
      tableName: 'clients_addresses',
      underscored: true,
    }
  );

  ClientAddress.associate = function(models) {
    ClientAddress.belongsTo(models.Client, {
      as: 'addresses',
      foreignKey: {
        name: 'clientId',
        allowNull: false,
      },
    });
  };

  return ClientAddress;
};
