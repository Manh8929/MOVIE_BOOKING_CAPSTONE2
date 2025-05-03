'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [
      {
        movie_id: 1,
        user_id: 1,
        rating: 5,
        comment: 'Bộ phim tuyệt vời! Mọi thứ đều hoàn hảo.',
        sentiment: 'positive',
        review_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 2,
        user_id: 2,
        rating: 4,
        comment: 'Nội dung hấp dẫn nhưng có một số điểm chưa hợp lý.',
        sentiment: 'positive',
        review_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 1,
        user_id: 3,
        rating: 3,
        comment: 'Bình thường, không có gì đặc sắc.',
        sentiment: 'neutral',
        review_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 3,
        user_id: 1,
        rating: 2,
        comment: 'Thất vọng, mong đợi nhiều hơn từ bộ phim này.',
        sentiment: 'negative',
        review_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        movie_id: 2,
        user_id: 4,
        rating: 1,
        comment: 'Tôi không thích bộ phim này chút nào.',
        sentiment: 'negative',
        review_time: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};
