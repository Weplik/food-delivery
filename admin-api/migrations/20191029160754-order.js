module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
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
      comment: {
        type: Sequelize.STRING,
      },
      operatorUsername: {
        field: 'operator_username',
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'username',
        },
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
      clientAddressId: {
        field: 'client_address_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clients_addresses',
          key: 'id',
        },
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('orders');
  },
};
