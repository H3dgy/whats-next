module.exports = {
  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
  up: queryInterface => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password01',
        avatar: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
};