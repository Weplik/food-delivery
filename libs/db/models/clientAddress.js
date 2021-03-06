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
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
