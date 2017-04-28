"use strict";

module.exports = function(sequelize, DataTypes) {
  var Subcategory = sequelize.define("Subcategory", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{ 
      type:DataTypes.STRING,
      allowNull: false
          }
  }, {
    timestamps: false,
    underscored: true
  });

  return Subcategory;
};