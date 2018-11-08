'use strict';

const uuid = require('uuid/v4');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Users', [
      {
        id: uuid(),
        name: 'Alice',
        email: 'alice@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        name: 'Bob',
        email: 'bob@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
