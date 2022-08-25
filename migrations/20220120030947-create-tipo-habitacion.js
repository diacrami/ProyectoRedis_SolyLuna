"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tipos_Habitacion", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      tipo: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      precio: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      num_camas: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      valoracion: {
        allowNull: false,
        type: Sequelize.FLOAT,
        validate: {
          min: 0,
          max: 5,
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
    await queryInterface.dropTable("Tipos_Habitacion");
  },
};
