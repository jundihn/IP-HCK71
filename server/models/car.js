"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.hasMany(models.Transaction, { foreignKey: "carId" });
      Car.hasMany(models.WishList, { foreignKey: "carId" });
    }
  }
  Car.init(
    {
      name: DataTypes.STRING,
      model: DataTypes.STRING,
      year: DataTypes.NUMBER,
      type: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  return Car;
};
