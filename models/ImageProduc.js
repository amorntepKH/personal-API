module.exports = (sequelize, DataTypes) => {
  const ImageProduct = sequelize.define("ImageProduct", {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return ImageProduct;
};
