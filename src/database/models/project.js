'use strict';
const paranoidDeleteCascade = require( '../utils/paranoidDeleteCascade');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.hasMany(models.Models, { foreignKey: 'projectId' })
      Project.hasMany(models.UsersProjects, { foreignKey: 'projectId' })
      Project.belongsTo(models.User, { foreignKey: 'managerId' })
      // Project.belongsToMany(models.User, { through: 'users_projects', foreignKey: 'projectId' })
    }
  };
  Project.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    managerId: {
      type: DataTypes.UUID,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    data: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Project',
    timestamps: true,
    paranoid: true
  });
  Project.addHook('afterDestroy', paranoidDeleteCascade)
  return Project;
};