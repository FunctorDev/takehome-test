'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('diagnostic_metrics', {
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
      units: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      min_age: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      max_age: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      gender: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      standard_lower: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      standard_higher: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      everlab_lower: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
      },
      everlab_higher: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: true,
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
    return queryInterface.dropTable('diagnostic_metrics');
  },
};
