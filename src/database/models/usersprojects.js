'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersProjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersProjects.belongsTo(models.User, { foreignKey: 'id' })
      UsersProjects.belongsTo(models.Project, { foreignKey: 'id' })
    }
  };
  UsersProjects.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    projectId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'UsersProjects',
  });
  return UsersProjects;
};