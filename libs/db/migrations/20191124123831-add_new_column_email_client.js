module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('clients', 'email', {
      type: Sequelize.STRING,
      unique: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('clients', 'email');
  },
};
