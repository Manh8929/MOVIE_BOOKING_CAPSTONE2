'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Theaters', [
      {
        name: 'Galaxy Cinema',
        location: 'Hà Nội',
        total_screens: 10,
        contact: '024-12345678',
        status: 'active',
        created_at: new Date(),
      },
      {
        name: 'CineStar',
        location: 'Hồ Chí Minh',
        total_screens: 8,
        contact: '028-87654321',
        status: 'active',
        created_at: new Date(),
      },
      {
        name: 'BHD Star',
        location: 'Đà Nẵng',
        total_screens: 6,
        contact: '0236-9876543',
        status: 'active',
        created_at: new Date(),
      },
      {
        name: 'Lotte Cinema',
        location: 'Nha Trang',
        total_screens: 5,
        contact: '0258-1234567',
        status: 'active',
        created_at: new Date(),
      },
      {
        name: 'Megastar',
        location: 'Cần Thơ',
        total_screens: 4,
        contact: '0292-7654321',
        status: 'active',
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Theaters', null, {});
  },
};
