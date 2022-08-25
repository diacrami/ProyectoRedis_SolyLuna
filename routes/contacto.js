const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const Usuario = require("../db/models").Usuario;
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.STAFF_EMAIL,
    pass: process.env.STAFF_PASSWORD,
  },
});

/* POST Añadir una habitación. */
router.post("/", function (req, res, next) {
  const { nombres, apellidos, correo_cliente, lugar_origen, mensaje } =
    req.body;

  Usuario.findAll({
    where: { admin: true },
    attributes: {
      exclude: [
        "id",
        "username",
        "password",
        "nombres",
        "apellidos",
        "password",
        "admin",
        "createdAt",
        "updatedAt",
      ],
    },
  })
    .then(usuarios => {
      let admin_emails = usuarios.reduce((result, elem) => {
        return result.concat(`${elem.email},`);
      }, "");
      admin_emails = admin_emails.slice(0, -1);

      const mailOptions = {
        from: `"Sol & Luna 🌞🌑 Soporte" <${process.env.STAFF_EMAIL}>`,
        to: admin_emails,
        subject: "Solicitud de contacto",
        html: `
        <h1>Hola administrador/res</h1>
        <p>${apellidos}, ${nombres} está intentando comunicarse con Hostería Sol & Luna<p><br>
        <h2>Datos del cliente</h2>
        <h3>nombres:</h3> ${nombres}
        <h3>apellidos:</h3> ${apellidos}
        <h3>correo cliente:</h3> ${correo_cliente}
        <h3>lugar origen:</h3> ${lugar_origen}<br><br>
        <h3>Mensaje</h3>
        ${mensaje}
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log(error);

        console.log("Email sent: " + info.response);
        res.status(200).send({
          message: "Correos enviados exitosamente.",
        });
      });
    })
    .catch(error => res.status(400).send(error));
});

module.exports = router;
