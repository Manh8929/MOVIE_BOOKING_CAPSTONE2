'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Payments', [
      {
        booking_id: 1,
        user_id: 1,
        payment_method: 'payos',
        payment_status: 'completed',
        amount: 15.99,
        payment_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        booking_id: 2,
        user_id: 2,
        payment_method: 'paypal',
        payment_status: 'completed',
        amount: 12.50,
        payment_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        booking_id: 3,
        user_id: 3,
        payment_method: 'payos',
        payment_status: 'pending',
        amount: 10.00,
        payment_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        booking_id: 4,
        user_id: 1,
        payment_method: 'payos',
        payment_status: 'failed',
        amount: 20.00,
        payment_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Payments', null, {});
  },
};
