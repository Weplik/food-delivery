module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'courier_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'couriers',
        key: 'id',
      },
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('orders', 'courier_id');
  },
};
