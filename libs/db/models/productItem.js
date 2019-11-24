module.exports = (sequelize, DataTypes) => {
  const ProductItem = sequelize.define(
    'ProductItem',
    {
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      primeCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'product_items',
      underscored: true,
    }
  );

  ProductItem.associate = function(models) {
    ProductItem.belongsTo(models.Ingredient, {
      foreignKey: 'ingredientId',
      sourceKey: 'id',
      as: 'ingredient',
    });

    ProductItem.belongsTo(models.Product, {
      as: 'items',
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
    });
  };

  return ProductItem;
};
