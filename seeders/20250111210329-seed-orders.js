'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Orders', [
      {
        userId: 1, // Relacionado con un usuario cliente
        businessId: 1, // Relacionado con un negocio
        statusId: 1, // Estado: Por pagar
        total: 1100.00,
        subtotal: 1000.00,
        iva: 100.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2, // Relacionado con otro usuario cliente
        businessId: 2, // Relacionado con otro negocio
        statusId: 2, // Estado: Pagada
        total: 50.00,
        subtotal: 45.00,
        iva: 5.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};


