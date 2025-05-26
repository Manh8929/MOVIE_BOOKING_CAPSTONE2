"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Seats", [
      {
        showtime_id: 1,
        seat_number: "A1",
        screen_id: 1,
        seat_type_id: 1,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        showtime_id: 1,
        seat_number: "A2",
        screen_id: 1,
        seat_type_id: 2,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        showtime_id: 2,
        seat_number: "B1",
        screen_id: 2,
        seat_type_id: 1,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        showtime_id: 2,
        seat_number: "B2",
        screen_id: 2,
        seat_type_id: 3,
        is_available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        showtime_id: 2,
        seat_number: "C1",
        screen_id: 3,
        seat_type_id: 1,
        is_available: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Seats", null, {});
  },
};
