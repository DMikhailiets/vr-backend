'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubscriptionType extends Model {
    static associate(models) {
      SubscriptionType.hasMany(models.Subscription, { foreignKey: 'typeId' })
    }
  };
  SubscriptionType.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration:  {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPublic:  {
      type: DataTypes.BOOLEAN,
      field: 'is_public',
      allowNull: false,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'SubscriptionType',
    timestamps: true,
    paranoid: true,
  });
  return SubscriptionType;
};