/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const {
  pipe,
  tail,
  chain,
  update,
  find,
  propEq,
  propOr,
  map,
} = require('ramda');
const { transformValueFromCsvToArrayOrElse } = require('../utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const diagnosticsFile = await fs.promises.readFile(
      path.resolve(__dirname, '..', 'data', 'diagnostics.csv'),
    );

    const listDiagnosticGroups = await queryInterface.rawSelect(
      'diagnostic_groups',
      {
        plain: false,
      },
      ['id', 'name'],
    );

    const listDiagnostics = parse(diagnosticsFile, {});

    const records = pipe(
      tail,

      chain((item) => {
        const diagnosticGroups = transformValueFromCsvToArrayOrElse(item[1]);

        if (diagnosticGroups) {
          return diagnosticGroups.map((group) => {
            const groupId = pipe(
              find(propEq(group, 'name')),
              propOr(null, 'id'),
            )(listDiagnosticGroups);

            return update(1, groupId, item);
          });
        }

        return [update(1, null, item)];
      }),

      map(([name, diagnostic_group_id]) => {
        return {
          diagnostic_group_id,
          name,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
    )(listDiagnostics);

    return await queryInterface.bulkInsert('diagnostics', records);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('diagnostics', null, {});
  },
};
