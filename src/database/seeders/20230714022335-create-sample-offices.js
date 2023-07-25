"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const officesDataExample = [
      {
        name: "Office 1",
        city: "Hà Nội",
        address: "Địa chỉ 1",
        coordinate: Sequelize.fn("ST_GeomFromText", "POINT(21.0285 105.8542)")
      },
      {
        name: "Office 2",
        city: "TP. Hồ Chí Minh",
        address: "Địa chỉ 2",
        coordinate: Sequelize.fn("ST_GeomFromText", "POINT(10.8231 106.6297)")
      },
      {
        name: "Office 3",
        city: "Đà Nẵng",
        address: "Địa chỉ 3",
        coordinate: Sequelize.fn("ST_GeomFromText", "POINT(16.0544 108.2022)")
      },
      {
        name: "Office 4",
        city: "Hải Phòng",
        address: "Địa chỉ 4",
        coordinate: Sequelize.fn("ST_GeomFromText", "POINT(20.8449 106.6881)")
      },
      {
        name: "Office 5",
        city: "Cần Thơ",
        address: "Địa chỉ 5",
        coordinate: Sequelize.fn("ST_GeomFromText", "POINT(10.0458 105.7469)")
      }
    ];
    await queryInterface.bulkInsert("offices", officesDataExample);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("offices", {
      name: {
        [Sequelize.Op.in]: [
          "Office 1",
          "Office 2",
          "Office 3",
          "Office 4",
          "Office 5"
        ]
      }
    });
  }
};
