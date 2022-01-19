'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Models extends Model {
    static associate(models) {
      Models.belongsTo(models.Project, { foreignKey: 'projectId' })
    }
  };
  Models.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    projectId:  {
      type: DataTypes.UUID,
      allowNull:false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Models',
    timestamps: true,
    paranoid: true
  });
  return Models;
};