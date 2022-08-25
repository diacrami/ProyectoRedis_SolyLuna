"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    const uuid_Suite = uuidv4();
    const uuid_Matrimonial = uuidv4();
    const uuid_Colegas = uuidv4();
    const uuid_Doble = uuidv4();

    await queryInterface.bulkInsert(
      "Tipos_Habitacion",
      [
        {
          id: uuid_Suite,
          tipo: "Suite",
          precio: 70,
          num_camas: 1,
          valoracion: 4.9,
        },
        {
          id: uuid_Matrimonial,
          tipo: "Matrimonial",
          precio: 29,
          num_camas: 1,
          valoracion: 4.7,
        },
        {
          id: uuid_Colegas,
          tipo: "Colegas",
          precio: 40,
          num_camas: 3,
          valoracion: 3.2,
        },
        {
          id: uuid_Doble,
          tipo: "Doble",
          precio: 35,
          num_camas: 2,
          valoracion: 3.6,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Habitaciones",
      [
        { id_tipo: uuid_Suite },
        { id_tipo: uuid_Suite },
        { id_tipo: uuid_Doble },
        { id_tipo: uuid_Doble },
        { id_tipo: uuid_Doble },
        { id_tipo: uuid_Colegas },
        { id_tipo: uuid_Colegas },
        { id_tipo: uuid_Colegas },
        { id_tipo: uuid_Matrimonial },
        { id_tipo: uuid_Matrimonial },
        { id_tipo: uuid_Matrimonial },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("Habitaciones", null, {});
    await queryInterface.bulkDelete("Tipos_Habitacion", null, {});
  },
};
