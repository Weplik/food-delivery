module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('products', 'prime_cost', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
      queryInterface.addColumn('product_items', 'prime_cost', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('products', 'prime_cost'),
      queryInterface.removeColumn('product_items', 'prime_cost'),
    ]);
  },
};
