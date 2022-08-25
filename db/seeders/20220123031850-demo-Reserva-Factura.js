const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */

    const cedula_johndoe = "2485930185";
    const cedula_willymateo = "3857480951";
    const cedula_lizvergara = "0985467831";
    const cedula_rafaelmontalvo = "7689047521";
    const cedula_briggittelopez = "0987542865";

    await queryInterface.bulkInsert(
      "Facturas",
      [
        {
          cedula_huesped: cedula_johndoe,
          fecha_facturacion: new Date(2021, 12, 30),
          precio_total: 80,
        },
        {
          cedula_huesped: cedula_willymateo,
          fecha_facturacion: new Date(2021, 12, 31),
          precio_total: 29,
        },
        {
          cedula_huesped: cedula_lizvergara,
          fecha_facturacion: new Date(2021, 12, 1),
          precio_total: 50,
        },
        {
          cedula_huesped: cedula_rafaelmontalvo,
          fecha_facturacion: new Date(2021, 12, 15),
          precio_total: 150,
        },
        {
          cedula_huesped: cedula_briggittelopez,
          fecha_facturacion: new Date(2021, 12, 20),
          precio_total: 128,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Reservas",
      [
        {
          id: uuidv4(),
          num_factura: 1,
          num_habitacion: 2,
          fecha_reservado: new Date(2021, 12, 30),
          fecha_entrada: new Date(2022, 1, 1),
          fecha_salida: new Date(2022, 1, 3),
        },
        {
          id: uuidv4(),
          num_factura: 1,
          num_habitacion: 9,
          fecha_reservado: new Date(2021, 12, 30),
          fecha_entrada: new Date(2022, 1, 1),
          fecha_salida: new Date(2022, 1, 3),
        },
        {
          id: uuidv4(),
          num_factura: 1,
          num_habitacion: 11,
          fecha_reservado: new Date(2021, 12, 30),
          fecha_entrada: new Date(2022, 1, 1),
          fecha_salida: new Date(2022, 1, 3),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("Reservas", null, {});
    await queryInterface.bulkDelete("Facturas", null, {});
  },
};
