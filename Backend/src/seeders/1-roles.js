'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      {
        role_name: 'admin',
        description: 'Quản trị viên có quyền truy cập đầy đủ vào hệ thống.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_name: 'staff',
        description: 'Nhân viên có quyền hạn hạn chế trong việc quản lý nội dung.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_name: 'customer',
        description: 'Khách hàng có quyền truy cập vào các dịch vụ và sản phẩm.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
