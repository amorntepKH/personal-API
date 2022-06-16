module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    }),
      Order.hasMany(models.OrderItem, {
        foreignKey: {
          name: "orderId",
        },
        onUpdate: "RESTRICT",
        onDelete: "RESTRICT",
      });
  };

  return Order;
};
