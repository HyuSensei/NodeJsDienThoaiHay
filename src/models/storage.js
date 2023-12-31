"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Storage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Storage.hasMany(models.Price);
      Storage.hasMany(models.Price, {
        foreignKey: "StorageId",
      });
    }
  }
  Storage.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Storage",
    }
  );
  return Storage;
};
