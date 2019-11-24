module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients_addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      house: {
        type: Sequelize.STRING,
      },
      floor: {
        type: Sequelize.STRING,
      },
      flat: {
        type: Sequelize.STRING,
      },
      isPrivateHouse: {
        field: 'is_private_house',
        type: Sequelize.STRING,
        defaultValue: false,
      },
      clientId: {
        field: 'client_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id',
        },
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('clients_addresses');
  },
};
