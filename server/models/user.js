"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, { foreignKey: "userId" });
      User.hasMany(models.WishList, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Username tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Username tidak boleh kosong",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Email tidak boleh kosong",
          },
          isEmail: {
            msg: "Format email tidak valid",
            args: true,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password tidak boleh kosong",
          },
          notNull: {
            args: true,
            msg: "Password tidak boleh kosong",
          },
          len: {
            args: [5],
            msg: "Minimum password length is 5",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, option) => {
          if (user.password) {
            user.password = hashPassword(user.password);
          }
        },
      },
    }
  );
  return User;
};
