module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      imageUrl: {
        field: 'image_url',
        type: DataTypes.STRING,
        allowNull: false,
      },
      calorieContent: {
        field: 'calorie_content',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'products',
      underscored: true,
    }
  );

  Product.associate = function(models) {
    Product.hasMany(models.ProductItem, {
      foreignKey: 'productId',
      sourceKey: 'id',
      as: 'product',
    });
  };

  return Product;
};
