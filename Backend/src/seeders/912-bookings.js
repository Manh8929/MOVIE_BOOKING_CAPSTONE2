'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bookings', [
      {
        user_id: 1,
        showtime_id: 1,
        qr_code: 'QR123456',
        total_price: 150.00,
        status: 'confirmed',
        booking_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        showtime_id: 1,
        qr_code: 'QR123457',
        total_price: 200.00,
        status: 'pending',
        booking_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        showtime_id: 2,
        qr_code: 'QR123458',
        total_price: 180.00,
        status: 'canceled',
        booking_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        showtime_id: 3,
        qr_code: 'QR123459',
        total_price: 220.00,
        status: 'confirmed',
        booking_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bookings', null, {});
  },
};
