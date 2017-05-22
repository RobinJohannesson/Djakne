var sequelize = require("sequelize");

"use strict";

module.exports = function(sequelize, DataTypes) {

  var Product = sequelize.define("Product", {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    keyword: {
      type: DataTypes.STRING,
      allowNull: true
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: true
    },
    likeAmount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    }, 
    created: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Product.belongsTo(models.Category),
        Product.hasMany(models.Like)
      }
    }
  });

  return Product;
};