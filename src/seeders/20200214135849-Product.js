/* eslint-disable indent */
const {
  uuid
} = require('uuidv4');

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
        uploadedBy: '755fa472-0e36-4e3a-916b-4c4113658df2',
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
        uploadedBy: '755fa472-0e36-4e3a-916b-4c4113658df2',
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
        uploadedBy: '639e9ab1-5a43-48a4-ac03-ed3292db4982',
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
        uploadedBy: '639e9ab1-5a43-48a4-ac03-ed3292db4982',
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
        uploadedBy: '755fa472-0e36-4e3a-916b-4c4113658df2',
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: '',
        imageName: '',
      },
    ], {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {}),
};