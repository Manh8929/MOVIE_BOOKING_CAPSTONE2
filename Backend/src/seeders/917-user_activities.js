'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User_Activities', [
      {
        user_id: 1,
        action: new Date(), // Hành động hiện tại
      },
      {
        user_id: 2,
        action: new Date('2025-05-01T10:00:00Z'), // Hành động tại thời điểm cụ thể
      },
      {
        user_id: 3,
        action: new Date('2025-05-02T12:00:00Z'),
      },
      {
        user_id: 4,
        action: new Date('2025-05-03T14:00:00Z'),
      },
      {
        user_id: 5,
        action: new Date('2025-05-04T16:00:00Z'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User_Activities', null, {});
  },
};
