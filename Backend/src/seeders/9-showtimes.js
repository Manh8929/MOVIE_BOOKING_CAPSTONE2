'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('showtimes', [
      {
        movie_id: 1,
        screen_id: 1,
        status: 'scheduled',
        show_time: new Date('2025-05-05T14:00:00Z'),
        ticket_price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 2,
        screen_id: 2,
        status: 'scheduled',
        show_time: new Date('2025-05-05T16:00:00Z'),
        ticket_price: 200000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 3,
        screen_id: 3,
        status: 'completed',
        show_time: new Date('2025-05-05T18:00:00Z'),
        ticket_price: 180000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 1,
        screen_id: 1,
        status: 'canceled',
        show_time: new Date('2025-05-05T20:00:00Z'),
        ticket_price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 2,
        screen_id: 2,
        status: 'scheduled',
        show_time: new Date('2025-05-06T14:00:00Z'),
        ticket_price: 200000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('showtimes', null, {});
  },
};
