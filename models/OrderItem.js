module.exports = (sequelize, Datatypes) => {
  const OrderItem = sequelize.define("OrderItem", {
    amount: {
      type: Datatypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        name: "orderId",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    OrderItem.belongsTo(models.Product, {
      foreignKey: {
        name: "productId",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };

  return OrderItem;
};
