'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('diagnostics', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('diagnostics');
  },
};
