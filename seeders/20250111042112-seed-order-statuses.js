'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('OrderStatuses', [
      { name: 'Por pagar', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pagada', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Devuelta', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cancelada', createdAt: new Date() , updatedAt: new Date()}
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('OrderStatuses', null, {});
  },
};
