'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('User_Promotions', [
      {
        user_id: 1,
        promo_id: 1,
        redeemed: false,
        redeemed_at: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        promo_id: 2,
        redeemed: true,
        redeemed_at: new Date('2025-05-01T10:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        promo_id: 1,
        redeemed: false,
        redeemed_at: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        promo_id: 3,
        redeemed: true,
        redeemed_at: new Date('2025-05-02T12:00:00Z'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 5,
        promo_id: 2,
        redeemed: false,
        redeemed_at: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User_Promotions', null, {});
  },
};
