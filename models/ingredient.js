module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
    'Ingredient',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      costPerKilo: {
        field: 'cost_per_kilo',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'ingredients',
      underscored: true,
    }
  );

  Ingredient.associate = function(models) {
    Ingredient.hasMany(models.ProductItem, {
      as: 'ingredient',
      foreignKey: {
        name: 'ingredientId',
        allowNull: false,
      },
    });
  };

  return Ingredient;
};
