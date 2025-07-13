'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'diagnostics',
          'diagnostic_group_id',
          {
            type: Sequelize.DataTypes.INTEGER,
            onDelete: 'SET NULL',
            references: {
              model: 'diagnostic_groups',
              key: 'id',
            },
          },
          {
            transaction: t,
          },
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('diagnostics', 'diagnostic_group_id', {
          transaction: t,
        }),
      ]);
    });
  },
};
