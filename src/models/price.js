"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Price.belongsTo(models.Product);
      Price.belongsTo(models.Product, {
        foreignKey: "ProductId",
      });
      // Price.belongsTo(models.Storage);
      Price.belongsTo(models.Storage, {
        foreignKey: "StorageId",
      });
    }
  }
  Price.init(
    {
      StorageId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      price_product: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Price",
    }
  );
  return Price;
};
