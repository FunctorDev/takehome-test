/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { pipe, tail, map } = require('ramda');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const diagnosticGroupsFile = await fs.promises.readFile(
      path.resolve(__dirname, '..', 'data', 'diagnostic_groups.csv'),
    );

    const listDiagnosticGroups = parse(diagnosticGroupsFile, {});

    const records = pipe(
      tail,
      map(([name]) => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    )(listDiagnosticGroups);

    return await queryInterface.bulkInsert('diagnostic_groups', records);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('diagnostic_groups', null, {});
  },
};
