'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      { name: 'Laptop', price: 1000.00, stock: 10, businessId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Camisa', price: 20.00, stock: 50, businessId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Celular', price: 500.00, stock: 5, businessId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Shorts', price: 200.00, stock: 32, businessId: 1, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};

