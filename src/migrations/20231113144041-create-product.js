"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      screen: {
        type: Sequelize.STRING,
      },
      resolution: {
        type: Sequelize.STRING,
      },
      rear_camera: {
        type: Sequelize.STRING,
      },
      front_camera: {
        type: Sequelize.STRING,
      },
      cpu: {
        type: Sequelize.STRING,
      },
      pin: {
        type: Sequelize.STRING,
      },
      sim: {
        type: Sequelize.STRING,
      },
      price_base: {
        type: Sequelize.FLOAT,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
