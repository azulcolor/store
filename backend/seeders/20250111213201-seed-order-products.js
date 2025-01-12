'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('OrderProducts', [
      {
        orderId: 1,
        productId: 1, 
        quantity: 1,
        price: 1000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 2, 
        quantity: 2,
        price: 50.00, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 3, 
        quantity: 1,
        price: 500.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('OrderProducts', null, {});
  },
};

