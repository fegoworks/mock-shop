/* eslint-disable indent */
const {
  uuid
} = require('uuidv4');

const pass = '$2a$10$n8.VJxTUhes7lDg/tZWZweApDNfPtj347S0H3x5p1RbklrVTZOqgG';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [{
        id: uuid(),
        firstName: 'Feggie',
        lastName: 'Edafe',
        email: 'feggie@mail.com',
        password: pass,
        isAdmin: 'true',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        firstName: 'Saitama',
        lastName: 'Goku',
        email: 'saitama@mail.com',
        password: pass,
        isAdmin: 'false',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        firstName: 'Adesuwa',
        lastName: 'George',
        email: 'georgia@mail.com',
        password: pass,
        isAdmin: 'false',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        firstName: 'Gentle',
        lastName: 'Jack',
        email: 'gentlejack@mail.com',
        password: pass,
        isAdmin: 'false',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        firstName: 'Grey',
        lastName: 'Area',
        email: 'greyarea@mail.com',
        password: pass,
        isAdmin: 'true',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};