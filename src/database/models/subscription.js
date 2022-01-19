'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      Subscription.belongsTo(models.User, { foreignKey: 'id' })
      Subscription.belongsTo(models.SubscriptionType, { foreignKey: 'id' })
    }
  };
  Subscription.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    typeId: {
      type: DataTypes.UUID,
      allowNull:false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull:false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Subscription',
    timestamps: true,
    paranoid: true
  });
  return Subscription;
};