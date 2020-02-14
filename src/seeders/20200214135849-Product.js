/* eslint-disable indent */
const {
  uuid
} = require('uuidv4');

const pass = '$2a$10$n8.VJxTUhes7lDg/tZWZweApDNfPtj347S0H3x5p1RbklrVTZOqgG';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Products',
    [{
        id: uuid(),
        name: 'Eggs',
        description: 'Rich in protein',
        category: 'Foods',
        price: 500,
        inStock: 'true',
        uploadedBy: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: '',
        imageName: '',
      },
      {
        id: uuid(),
        name: 'Rice',
        description: 'Serious carbs',
        category: 'Foods',
        price: 3000,
        inStock: 'true',
        uploadedBy: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: '',
        imageName: '',
      },
      {
        id: uuid(),
        name: 'T shirts',
        description: 'Clothes on fleek',
        category: 'clothes',
        price: 5000,
        inStock: 'false',
        uploadedBy: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: '',
        imageName: '',
      },
      {
        id: uuid(),
        name: 'Game console',
        description: 'Techie in the building',
        category: 'accesories',
        price: 230,
        inStock: 'true',
        uploadedBy: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: '',
        imageName: '',
      },
      {
        id: uuid(),
        name: 'Sweat pants',
        description: 'For the hood',
        category: 'Clothes',
        price: 490,
        inStock: false,
        uploadedBy: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: '',
        imageName: '',
      },
    ], {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {}),
};