/* eslint-disable indent */
const {
  uuid
} = require('uuidv4');

const saitama = '051f7793-ff58-4d01-a0eb-2e10e3716164';
const adesuwa = '4edbb517-39ea-4848-b4b5-c6eb78a006f6';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Carts',
    [{
        id: uuid(),
        userId: saitama,
        productId: '1c4b5202-c569-40be-bac2-c05dae6b97b9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        userId: saitama,
        productId: 'cd727242-eb83-4bf1-9e8c-7055cfc56182',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        userId: adesuwa,
        productId: 'd0e6f3b5-55e8-49b2-a0e8-6570bc78eb0e',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        userId: adesuwa,
        productId: '9d564f67-695c-4323-b618-3b752de90aaa',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        userId: saitama,
        productId: '1c4b5202-c569-40be-bac2-c05dae6b97b9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Carts', null, {}),
};