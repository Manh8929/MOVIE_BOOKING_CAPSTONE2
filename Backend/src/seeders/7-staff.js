'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Staff', [
      {
        user_id: 1,
        role_id: 1,
        theater_id: 1,
        hire_date: new Date('2023-01-15'),
        salary: 5000000,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        role_id: 2,
        theater_id: 1,
        hire_date: new Date('2023-02-20'),
        salary: 6000000,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        role_id: 1,
        theater_id: 2,
        hire_date: new Date('2023-03-10'),
        salary: 5500000,
        status: 'resigned',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 4,
        role_id: 3,
        theater_id: 2,
        hire_date: new Date('2023-04-05'),
        salary: 7000000,
        status: 'terminated',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 5,
        role_id: 2,
        theater_id: 1,
        hire_date: new Date('2023-05-01'),
        salary: 6000000,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Staff', null, {});
  },
};
