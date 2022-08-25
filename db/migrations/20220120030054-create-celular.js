"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Celulares", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      codigo: {
        allowNull: false,
        defaultValue: 593,
        type: Sequelize.INTEGER,
      },
      numero: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      cedula_huesped: {
        allowNull: false,
        type: Sequelize.STRING(10),
        references: {
          model: "Huespedes", //Table name.
          key: "cedula",
        },
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Celulares");
  },
};
