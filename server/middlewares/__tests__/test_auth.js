const authMiddleware = require('../authMiddleware');
const thirdPartyAuthentication = require('../thirdPartyAuthentication');

describe('Test authentication middleware: ', () => {

  const token = "EAAEMYXz0VrMBAOBQpiZCTvr4rKljBb6fsdpzoiHEsCbnYGAy2ei9szVx8Dr2zQPDkn3vLJsKendD7JR55CYjvo3yZBTn2u7Jg1nOI2pC8GPilJBSagv9CihbFLxajtP3xGjBiYqZAs14rIzAlyU1bQITiT835ZA5Fx4awLdFDXkyy6dt8rtUC0aQK4BqQrQf8c0jRdWZAdgZDZD";

  xit('Given a valid user token verifyFacebook should return boolean true', async () => {
    expect(await thirdPartyAuthentication.verifyFacebook(token)).toMatchObject({
      isValid: true,
    })
  })
});