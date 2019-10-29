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

  return Client;
};
