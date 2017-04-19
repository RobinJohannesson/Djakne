"use strict";


// TODO: Ändra primary key till (productId + userId), så att en användare bara kan gilla en sak en gång.

module.exports = function(sequelize, DataTypes) {
  var Like = sequelize.define("Like", {  
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Like.belongsTo(models.Product),
        Like.belongsTo(models.User)
      }
    }
  });

  return Like;
};