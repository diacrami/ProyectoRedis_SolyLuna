const express = require("express");
const router = express.Router();
const Tipo_Habitacion = require("../db/models").Tipo_Habitacion;
const Habitacion = require("../db/models").Habitacion;
const Reserva = require("../db/models").Reserva;
const Factura = require("../db/models").Factura;
const Usuario = require("../db/models").Usuario;
const Huesped = require("../db/models").Huesped;


const redis= require('redis');
const client=redis.createClient({ //para conectarse a redis creas un cliente y le pasas un objeto, el cual recibe la propiedad host
  host: 'localhost', // es para decirle a redis donde esta la base de datos de redis
  port: 6379,
});

//============================= Habitaciones ===================================
/* GET Todas las reservas. */
router.get("/", function (req, res, next) {

  client.get('lista_reservas',(err,reply)=>{
    if(reply){
      //console.log('deredis');
      //console.log(reply);
      return res.json(JSON.parse(reply));
    }
    Reserva.findAll({
      attributes: {
        exclude: ["num_factura", "num_habitacion", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Factura,
          as: "Factura",
          attributes: {
            exclude: ["cedula_huesped", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Huesped,
              as: "Huesped",
              attributes: {
                exclude: [
                  "id_usuario",
                  "fecha_nacimiento",
                  "createdAt",
                  "updatedAt",
                ],
              },
              include: [
                {
                  model: Usuario,
                  as: "Usuario",
                  attributes: {
                    exclude: ["password", "createdAt", "updatedAt"],
                  },
                },
              ],
            },
          ],
        },
        {
          model: Habitacion,
          as: "Habitacion",
          attributes: {
            exclude: ["id_tipo", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Tipo_Habitacion,
              as: "Tipo_Habitacion",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
    })
      .then(habitaciones => {
        client.set('lista_reservas',JSON.stringify(habitaciones), (err,reply)=>{
          if (err) console.log(err);
          console.log(reply);
          res.send(habitaciones);
        }); //esto es un objeto y redis guarda un string así que debes convertirlo
          //con JSON.stringify({objeto})
        
      })
      .catch(error => res.status(400).send(error));
  });
});

/* GET las reservas de un usuario específico. */
//Futuro: Corregir el where clause, por ahora se utilizó PF en filter de response.
router.get("/:username", function (req, res, next) {
  const { username } = req.params;

  Reserva.findAll({
    attributes: {
      exclude: [
        "num_factura",
        "num_habitacion",
        "cedula_huesped",
        "createdAt",
        "updatedAt",
      ],
    },
    include: [
      {
        model: Factura,
        as: "Factura",
        attributes: {
          exclude: ["cedula_huesped", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Huesped,
            as: "Huesped",
            attributes: {
              exclude: [
                "id_usuario",
                "fecha_nacimiento",
                "createdAt",
                "updatedAt",
              ],
            },
            include: [
              {
                model: Usuario,
                as: "Usuario",
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
      },
      {
        model: Habitacion,
        as: "Habitacion",
        attributes: {
          exclude: ["id_tipo", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Tipo_Habitacion,
            as: "Tipo_Habitacion",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
  })
    .then(reservas => {
      res.send(
        reservas.filter(elem => {
          return elem.Factura.Huesped.Usuario.username == username;
        })
      );
    })
    .catch(error => res.status(400).send(error));
});

/* POST Añadir una reserva. */
router.post("/", function (req, res, next) {
  const { num_factura, num_habitacion, fecha_entrada, fecha_salida } = req.body;

  let nueva_Habitacion = {
    num_factura,
    num_habitacion,
    fecha_reservado: new Date(),
    fecha_entrada,
    fecha_salida,
  };

  Reserva.create(nueva_Habitacion)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Un error ocurrió al crear la Habitacion.",
      });
    });
});

/* PUT Actualizar una reserva. */
router.put("/:id_reserva", (req, res, next) => {
  const { id_reserva } = req.params;

  const { num_habitacion, fecha_entrada, fecha_salida } = req.body;

  let reserva_actualizada = {
    num_habitacion,
    fecha_entrada,
    fecha_salida,
    updatedAt: new Date(),
  };

  Reserva.update(reserva_actualizada, {
    where: { id: id_reserva },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Reserva '${id_reserva}' actualizada exitosamente`,
        });
      } else {
        res.send({
          message: `No fue posible actualizar la reserva '${id_reserva}'.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al actualizar la reserva '${id_reserva}'.
        ${err}`,
      });
    });
});

/* DELETE Eliminar una reserva. */
router.delete("/:id_reserva", function (req, res, next) {
  let { id_reserva } = req.params;

  Reserva.destroy({
    where: { id: id_reserva },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Reserva '${id_reserva}' eliminada exitosamente`,
        });
      } else {
        res.send({
          message: `No fué posible eliminar la reserva '${id_reserva}'.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al eliminar reserva '${id_reserva}'.
        ${err}`,
      });
    });
});

module.exports = router;
