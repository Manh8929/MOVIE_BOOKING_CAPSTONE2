"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("showtimes", [
      {
        movie_id: 1,
        screen_id: 1,
        status: "scheduled",
        show_time: new Date("2025-05-19T14:00:00Z"), // was 03:00
        ticket_price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 1,
        screen_id: 2,
        status: "scheduled",
        show_time: new Date("2025-05-19T15:00:00Z"), // was 05:00
        ticket_price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 2,
        screen_id: 1,
        status: "scheduled",
        show_time: new Date("2025-05-20T16:00:00Z"),
        ticket_price: 160000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 2,
        screen_id: 3,
        status: "scheduled",
        show_time: new Date("2025-05-20T17:00:00Z"),
        ticket_price: 170000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 3,
        screen_id: 1,
        status: "scheduled",
        show_time: new Date("2025-05-21T18:00:00Z"),
        ticket_price: 180000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 3,
        screen_id: 2,
        status: "scheduled",
        show_time: new Date("2025-05-21T19:00:00Z"),
        ticket_price: 180000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 4,
        screen_id: 1,
        status: "scheduled",
        show_time: new Date("2025-05-22T20:00:00Z"),
        ticket_price: 190000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 2,
        screen_id: 2,
        status: "scheduled",
        show_time: new Date("2025-05-22T21:00:00Z"),
        ticket_price: 200000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 1,
        screen_id: 3,
        status: "scheduled",
        show_time: new Date("2025-05-22T22:00:00Z"),
        ticket_price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 3,
        screen_id: 2,
        status: "scheduled",
        show_time: new Date("2025-05-23T23:00:00Z"),
        ticket_price: 180000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 1,
        screen_id: 1,
        status: "scheduled",
        show_time: new Date("2025-05-23T23:30:00Z"),
        ticket_price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Ngày hôm sau
      {
        movie_id: 1,
        screen_id: 3,
        status: "scheduled",
        show_time: new Date("2025-05-23T01:00:00Z"),
        ticket_price: 180000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 2,
        screen_id: 1,
        status: "scheduled",
        show_time: new Date("2025-05-23T03:00:00Z"),
        ticket_price: 190000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Các showtime cũ hoặc trạng thái khác giữ nguyên để test
      {
        movie_id: 1,
        screen_id: 1,
        status: "canceled",
        show_time: new Date("2025-05-05T20:00:00Z"),
        ticket_price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 3,
        screen_id: 3,
        status: "completed",
        show_time: new Date("2025-05-05T18:00:00Z"),
        ticket_price: 180000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("showtimes", null, {});
  },
};
