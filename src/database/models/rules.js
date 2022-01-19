'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rules.belongsTo(models.UserType, { foreignKey: 'userTypeId' })
    }
  };
  Rules.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    get: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    update: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    updatedFields: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Rules',
    timestamps: true,
    paranoid: true
  });
  return Rules;
};