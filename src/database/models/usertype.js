'use strict';
const paranoidDeleteCascade = require( '../utils/paranoidDeleteCascade');
const models = require('./')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {
    static associate(models) {
      UserType.hasMany(models.User, { foreignKey: 'userTypeId' })
      UserType.hasMany(models.Rules, { foreignKey: 'userTypeId' })
    }
  };
  UserType.init({
    color: {
      type: DataTypes.STRING,
    },
    title:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING
    },
  }, {
    hooks: {
      afterBulkDestroy: instance => {
        paranoidDeleteCascade(instance)
      }
    },
    sequelize,
    modelName: 'UserType',
    timestamps: true,
    paranoid: true,
  });
  return UserType;
};