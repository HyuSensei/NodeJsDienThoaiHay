"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Order, { through: "Order_Product" });
      Product.belongsToMany(models.Color, { through: "Color_Product" });
      Product.hasMany(models.Price);
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      sim: DataTypes.STRING,
      screen: DataTypes.STRING,
      cpu: DataTypes.STRING,
      rear_camera: DataTypes.STRING,
      front_camera: DataTypes.STRING,
      speaker: DataTypes.STRING,
      pin: DataTypes.STRING,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
