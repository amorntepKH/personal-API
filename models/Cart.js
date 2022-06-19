module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
    });

    Cart.belongsTo(models.Product, {
      foreignKey: {
        name: "productId",
      },
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
    });
  };
  return Cart;
};
