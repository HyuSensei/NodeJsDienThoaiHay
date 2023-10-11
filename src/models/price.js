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
      Price.belongsTo(models.Product);
      Price.belongsTo(models.Ram);
      Price.belongsTo(models.Storage);
    }
  }
  Price.init(
    {
      RamId: DataTypes.INTEGER,
      StorageId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Price",
    }
  );
  return Price;
};
