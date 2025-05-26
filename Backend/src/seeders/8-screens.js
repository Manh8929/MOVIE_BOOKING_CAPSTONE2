'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('screens', [
      {
        theater_id: 1,
        screen_name: 'Màn hình 1',
        total_seats: 116,
        screen_type: '2D',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theater_id: 1,
        screen_name: 'Màn hình 2',
        total_seats: 126,
        screen_type: '3D',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theater_id: 2,
        screen_name: 'Màn hình 3',
        total_seats: 136,
        screen_type: 'IMAX',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theater_id: 2,
        screen_name: 'Màn hình 4',
        total_seats: 116,
        screen_type: '2D',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        theater_id: 3,
        screen_name: 'Màn hình 5',
        total_seats: 116,
        screen_type: '3D',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('screens', null, {});
  },
};
