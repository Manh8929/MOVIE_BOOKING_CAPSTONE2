'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        full_name: 'Nguyễn Văn A',
        email: 'adminn@gmail.com',
        password: '12345678',
        phone_number: '0123456789',
        role_id: 1,
        avatar: 'avatar1.png',
        dob: new Date('1990-01-01'),
        gender: 'male',
        address: 'Hà Nội',
        provider: 'local',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Trần Thị B',
        email: 'tranthib@gmail.com',
        password: '12345678', // Thay thế bằng mật khẩu đã được mã hóa
        phone_number: '0987654321',
        role_id: 2,
        avatar: 'avatar2.png',
        dob: new Date('1995-05-15'),
        gender: 'female',
        address: 'Hồ Chí Minh',
        provider: 'google',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Lê Văn C',
        email: 'levanc@gmail.com',
        password: 'password_3', // Thay thế bằng mật khẩu đã được mã hóa
        phone_number: '0912345678',
        role_id: 1,
        avatar: 'avatar3.png',
        dob: new Date('1988-03-10'),
        gender: 'male',
        address: 'Đà Nẵng',
        provider: 'facebook',
        status: 'inactive',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Phạm Thị D',
        email: 'phamthid@gmail.com',
        password: 'password_4', // Thay thế bằng mật khẩu đã được mã hóa
        phone_number: '0976543210',
        role_id: 2,
        avatar: 'avatar4.png',
        dob: new Date('2000-12-25'),
        gender: 'female',
        address: 'Nha Trang',
        provider: 'local',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Nguyễn Văn E',
        email: 'nguyenvane@gmail.com',
        password: 'password_5', // Thay thế bằng mật khẩu đã được mã hóa
        phone_number: '0934567890',
        role_id: 1,
        avatar: 'avatar5.png',
        dob: new Date('1992-07-30'),
        gender: 'other',
        address: 'Cần Thơ',
        provider: 'google',
        status: 'inactive',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
