"use strict";
const { v4: uuidv4 } = require("uuid");
const randomString = require("random-string");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    const password_general = "dawm2022";
    const uuid_johndoe = "830bb54e-e40d-49d5-8712-d25e01650e70";
    const uuid_willymateo = "e080882c-06a5-4599-9fb2-3d08d89bd1b6";
    const uuid_lizvergara = "645961cb-f347-40a2-8687-80ce056b26bf";
    const uuid_rafaelmontalvo = "1ccab24f-7483-4ebb-9930-081178c85905";
    const uuid_briggittelopez = "f644e413-25a2-4888-94b0-cd5f1de5d719";

    await queryInterface.bulkInsert(
      "Usuarios",
      [
        {
          id: uuid_johndoe,
          username: "johndoe",
          passwordHash: await bcrypt.hash(password_general, saltRounds),
          nombres: "Jhon Wilson",
          apellidos: "Doe Sparrow",
          email: "johndoe@gmail.com",
          admin: false,
        },
        {
          id: uuid_willymateo,
          username: "willymateo",
          passwordHash: await bcrypt.hash(password_general, saltRounds),
          nombres: "Willy Joao",
          apellidos: "Mateo Espinoza",
          email: "wjmateo@espol.edu.ec",
          admin: true,
        },
        {
          id: uuid_lizvergara,
          username: "lizvergara",
          passwordHash: await bcrypt.hash(password_general, saltRounds),
          nombres: "Liz",
          apellidos: "Vergara",
          email: "lizvcast@espol.edu.ec",
          admin: true,
        },
        {
          id: uuid_rafaelmontalvo,
          username: "rafaelmontalvo",
          passwordHash: await bcrypt.hash(password_general, saltRounds),
          nombres: "Rafael",
          apellidos: "Montalvo",
          email: "rafamont@espol.edu.ec",
          admin: true,
        },
        {
          id: uuid_briggittelopez,
          username: "briggittelopez",
          passwordHash: await bcrypt.hash(password_general, saltRounds),
          nombres: "Briggitte",
          apellidos: "Lopez",
          email: "brililop@espol.edu.ec",
          admin: true,
        },
      ],
      {}
    );

    const cedula_johndoe = "2485930185";
    const cedula_willymateo = "3857480951";
    const cedula_lizvergara = "0985467831";
    const cedula_rafaelmontalvo = "7689047521";
    const cedula_briggittelopez = "0987542865";

    await queryInterface.bulkInsert(
      "Huespedes",
      [
        {
          cedula: cedula_johndoe,
          id_usuario: uuid_johndoe,
          pais: "EE.UU",
          ciudad: "Washington D.C",
          fecha_nacimiento: new Date(1980, 12, 25),
        },
        {
          cedula: cedula_willymateo,
          id_usuario: uuid_willymateo,
          pais: "Ecuador",
          ciudad: "Santa Elena",
          fecha_nacimiento: new Date(1999, 5, 2),
        },
        {
          cedula: cedula_lizvergara,
          id_usuario: uuid_lizvergara,
          pais: "Ecuador",
          ciudad: "Guayaquil",
          fecha_nacimiento: new Date(1990, 2, 9),
        },
        {
          cedula: cedula_rafaelmontalvo,
          id_usuario: uuid_rafaelmontalvo,
          pais: "Afganistán",
          ciudad: "Kabul",
          fecha_nacimiento: new Date(2001, 4, 19),
        },
        {
          cedula: cedula_briggittelopez,
          id_usuario: uuid_briggittelopez,
          pais: "Japon",
          ciudad: "Tokio",
          fecha_nacimiento: new Date(1997, 11, 23),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Celulares",
      [
        {
          id: uuidv4(),
          codigo: 1,
          numero: randomString({
            length: 10,
            numeric: true,
            letters: false,
          }),
          cedula_huesped: cedula_johndoe,
        },
        {
          id: uuidv4(),
          codigo: 1,
          numero: randomString({
            length: 10,
            numeric: true,
            letters: false,
          }),
          cedula_huesped: cedula_johndoe,
        },
        {
          id: uuidv4(),
          codigo: 593,
          numero: randomString({
            length: 10,
            numeric: true,
            letters: false,
          }),
          cedula_huesped: cedula_willymateo,
        },
        {
          id: uuidv4(),
          codigo: 593,
          numero: randomString({
            length: 10,
            numeric: true,
            letters: false,
          }),
          cedula_huesped: cedula_willymateo,
        },
        {
          id: uuidv4(),
          codigo: 593,
          numero: randomString({
            length: 10,
            numeric: true,
            letters: false,
          }),
          cedula_huesped: cedula_lizvergara,
        },
        {
          id: uuidv4(),
          codigo: 593,
          numero: randomString({
            length: 10,
            numeric: true,
            letters: false,
          }),
          cedula_huesped: cedula_lizvergara,
        },
        {
          id: uuidv4(),
          codigo: 593,
          numero: randomString({
            length: 10,
            numeric: true,
            letters: false,
          }),
          cedula_huesped: cedula_lizvergara,
        },
        {
          id: uuidv4(),
          codigo: 998,
          numero: randomString({
            length: 10,
            numeric: true,
            letters: false,
          }),
          cedula_huesped: cedula_rafaelmontalvo,
        },
        {
          id: uuidv4(),
          codigo: 81,
          numero: randomString({
            length: 10,
            numeric: true,
            letters: false,
          }),
          cedula_huesped: cedula_briggittelopez,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("Celulares", null, {});
    await queryInterface.bulkDelete("Huespedes", null, {});
    await queryInterface.bulkDelete("Usuarios", null, {});
  },
};
