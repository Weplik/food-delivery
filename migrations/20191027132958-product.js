module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        field: 'image_url',
        type: Sequelize.STRING,
        allowNull: false,
      },
      calorieContent: {
        field: 'calorie_content',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weight: {
        type: Sequelize.INTEGER,
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
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('products');
  },
};
