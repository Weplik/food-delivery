module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ingredients', 'is_enabled', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('ingredients', 'is_enabled');
  },
};
