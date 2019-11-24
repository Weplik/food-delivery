module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('clients', 'password', {
      type: Sequelize.STRING,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('clients', 'password');
  },
};
