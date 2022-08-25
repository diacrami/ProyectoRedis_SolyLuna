"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Huespedes", {
      cedula: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING(10),
      },
      id_usuario: {
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
        references: {
          model: "Usuarios", //Table name.
          key: "id",
        },
      },
      pais: {
        allowNull: false,
        defaultValue: "Ecuador",
        type: Sequelize.STRING,
      },
      ciudad: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fecha_nacimiento: {
        allowNull: false,
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("Huespedes");
  },
};
