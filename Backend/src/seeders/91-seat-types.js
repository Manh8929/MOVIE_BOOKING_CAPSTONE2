"use strict";

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert("seat_types", [
        { name: "regular", price: 100.00 },
        { name: "vip", price: 200.00 },
        { name: "couple", price: 300.00 },
        // { name: "disabled", price: 80.00 },
      ]);
    },

    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("seat_types", null, {});
    },
  };
