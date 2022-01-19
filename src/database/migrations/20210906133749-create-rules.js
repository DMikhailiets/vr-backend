'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rules', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'UserTypes'
          },
          key: 'id'
        }
      },
      entity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      create: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      update: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      get: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      delete: {
        type: Sequelize.BOOLEAN
      },
      updatedFields: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rules');
  }
};