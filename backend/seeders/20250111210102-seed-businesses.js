'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Businesses', [
      { name: 'Tech Store', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Clothing Mart', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gadget World', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Businesses', null, {});
  },
};

