'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Promotions', [
      {
        title: 'Giảm giá mùa hè',
        description: 'Giảm 20% cho tất cả các bộ phim trong mùa hè này.',
        image_url: 'https://example.com/promotions/summer_discount.jpg',
        code: 'SUMMER20',
        discount_type: 'percentage',
        discount_value: 20.00,
        min_order_value: 50.00,
        max_discount: 15.00,
        valid_from: new Date('2025-06-01'),
        valid_to: new Date('2025-08-31'),
        applicable_movies: 'all',
        applicable_payment: 'credit_card',
        usage_limit: 100,
        user_limit: 1,
        used_count: 0,
        max_users: 100,
        status: 'active',
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Giảm giá cho sinh viên',
        description: 'Giảm giá 10% cho tất cả sinh viên với thẻ sinh viên.',
        image_url: 'https://example.com/promotions/student_discount.jpg',
        code: 'STUDENT10',
        discount_type: 'percentage',
        discount_value: 10.00,
        min_order_value: 30.00,
        max_discount: 5.00,
        valid_from: new Date('2025-05-01'),
        valid_to: new Date('2025-12-31'),
        applicable_movies: 'new_releases',
        applicable_payment: 'paypal',
        usage_limit: 50,
        user_limit: 1,
        used_count: 0,
        max_users: 50,
        status: 'active',
        created_by: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Giảm giá cho lần đặt đầu tiên',
        description: 'Giảm giá 15% cho lần đặt đầu tiên.',
        image_url: 'https://example.com/promotions/first_order_discount.jpg',
        code: 'FIRST15',
        discount_type: 'percentage',
        discount_value: 15.00,
        min_order_value: 20.00,
        max_discount: 10.00,
        valid_from: new Date('2025-05-01'),
        valid_to: new Date('2025-11-30'),
        applicable_movies: 'all',
        applicable_payment: 'debit_card',
        usage_limit: 200,
        user_limit: 1,
        used_count: 0,
        max_users: 200,
        status: 'active',
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Promotions', null, {});
  },
};
