module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('clients_addresses', 'is_enabled', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('clients_addresses', 'is_enabled');
  },
};
