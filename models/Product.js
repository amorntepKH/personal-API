module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isInstock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    }),
      Product.hasMany(models.OrderItem, {
        foreignKey: {
          name: "productId",
        },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      });
  };

  return Product;
};