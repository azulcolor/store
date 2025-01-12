'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('Password123', 10);

    await queryInterface.bulkInsert('Users', [
      { name: 'John Doe', email: 'john@example.com', password: hashedPassword, roleId: 1, businessId: 1, createdAt: new Date(), updatedAt: new Date(), isVerified: true },
      { name: 'Jane Business', email: 'jane@example.com', password: hashedPassword, roleId: 2, createdAt: new Date(), updatedAt: new Date(), isVerified: true },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

