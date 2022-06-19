module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("client", "admin"),
      defaultValue: "client",
    },
    profilePic: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      // onUpdate: "RESTRICT",
      // onDelete: "RESTRICT",
    });

    User.hasMany(models.Cart, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      // onUpdate: "cascade",
      // onDelete: "cascade",
    });
  };

  return User;
};
