'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Booking_Seats', [
      {
        booking_id: 1,
        seat_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        booking_id: 1,
        seat_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        booking_id: 2,
        seat_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        booking_id: 2,
        seat_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        booking_id: 3,
        seat_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        booking_id: 5,
        seat_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Booking_Seats', null, {});
  },
};
