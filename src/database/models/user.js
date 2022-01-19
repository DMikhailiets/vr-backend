'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.UserType, { foreignKey: 'id' })
      User.hasMany(models.Subscription, { foreignKey: 'userId' })
      User.hasMany(models.UsersProjects, { foreignKey: 'userId' })
      // User.belongsToMany(models.Project, { through: 'users_projects',foreignKey: 'userId'})
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title:  {
      type: DataTypes.STRING,
    },
    description:  {
      type: DataTypes.STRING,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    companyId: {
      type: DataTypes.UUID
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    systemIntegratorId: {
      type: DataTypes.UUID,
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    paranoid: true,
  });
  return User;
};