module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('couriers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imei: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
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
      isEnabled: {
        field: 'is_enabled',
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      activeOrders: {
        field: 'active_orders',
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('couriers');
  },
};
