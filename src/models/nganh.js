"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nganh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nganh.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      slug: DataTypes.STRING,
      title: DataTypes.STRING,
      meta_des: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "nganh",
    }
  );
  return nganh;
};
