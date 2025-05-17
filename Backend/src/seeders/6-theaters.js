"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Theaters", [
      {
        name: "Galaxy Cinema",
        location: "Hà Nội",
        contact: "024-12345678",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CineStar",
        location: "Hồ Chí Minh",
        contact: "028-87654321",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "BHD Star",
        location: "Đà Nẵng",
        contact: "0236-9876543",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lotte Cinema",
        location: "Nha Trang",
        contact: "0258-1234567",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Megastar",
        location: "Cần Thơ",
        contact: "0292-7654321",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Theaters", null, {});
  },
};
