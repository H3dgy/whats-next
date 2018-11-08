'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
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
