"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Color_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Color_Product.belongsTo(models.Color, { foreignKey: "ColorId" });
      Color_Product.belongsTo(models.Product, { foreignKey: "ProductId" });
    }
  }
  Color_Product.init(
    {
      ColorId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Color_Product",
    }
  );
  return Color_Product;
};
