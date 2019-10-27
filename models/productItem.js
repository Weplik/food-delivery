module.exports = (sequelize, DataTypes) => {
  const ProductItem = sequelize.define(
    'ProductItem',
    {
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      underscored: true,
    }
  );

  ProductItem.associate = function(models) {
    ProductItem.belongsTo(models.Product, {
      as: 'product',
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
    });
  };

  ProductItem.associate = function(models) {
    ProductItem.belongsTo(models.Ingredient, {
      foreignKey: 'ingredientId',
      sourceKey: 'id',
      as: 'ingredient',
    });
  };

  return ProductItem;
};
