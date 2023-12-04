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
      // Product.belongsTo(models.Category);
      Product.belongsTo(models.Category, {
        foreignKey: "CategoryId",
      });
      // Product.hasMany(models.Price);
      Product.hasMany(models.Price, {
        foreignKey: "ProductId",
      });
      Product.belongsToMany(models.Color, {
        through: "Color_Product",
      });
      Product.hasMany(models.Color_Product, { foreignKey: "ProductId" });
      Product.belongsToMany(models.Order, { through: "Order_Product" });
      Product.hasMany(models.Order_Product, { foreignKey: "ProductId" });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      screen: DataTypes.STRING,
      resolution: DataTypes.STRING,
      rear_camera: DataTypes.STRING,
      front_camera: DataTypes.STRING,
      cpu: DataTypes.STRING,
      pin: DataTypes.STRING,
      sim: DataTypes.STRING,
      price_base: DataTypes.FLOAT,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
