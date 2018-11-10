'use strict';

const md5 = require('md5');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        avatar: `https://www.gravatar.com/avatar/${md5(
          'alice@example.com'
        )}?s=200`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        avatar: `https://www.gravatar.com/avatar/${md5(
          'bob@example.com'
        )}?s=200`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
