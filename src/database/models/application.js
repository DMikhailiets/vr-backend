'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Application.belongsTo(models.User, { foreignKey: 'requestUserId' }),
      Application.belongsTo(models.User, { foreignKey: 'executorId' })
    }
  };
  Application.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    requestUserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    category: DataTypes.TEXT,
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    priority: DataTypes.TEXT,
    description: DataTypes.TEXT,
    executorId: DataTypes.UUID,
    enable: DataTypes.BOOLEAN,
    closedTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Application',
    timestamps: true,
    paranoid: true
  });
  return Application;
};