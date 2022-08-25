"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reservas", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      num_factura: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Facturas", //Table name.
          key: "num",
        },
      },
      num_habitacion: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Habitaciones", //Table name.
          key: "num",
        },
      },
      fecha_reservado: {
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
        type: Sequelize.DATE,
      },
      fecha_entrada: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      fecha_salida: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Reservas");
  },
};
