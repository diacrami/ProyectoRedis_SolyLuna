const express = require("express");
const router = express.Router();
const Habitacion = require("../db/models").Habitacion;
const Tipo_Habitacion = require("../db/models").Tipo_Habitacion;

//============================= Habitaciones ===================================
/* GET Todas las habitaciones. */

const redis= require("redis");
const client=redis.createClient({ 
    host: "localhost", 
    port: 6379,
});

router.get("/", function (req, res, next) {

  client.get("lista_habitaciones",(err,reply)=>{
    if(reply){
      return res.json(JSON.parse(reply));
    }
    Habitacion.findAll({
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
    })
      .then(habitaciones => {
        client.set('lista_habitaciones',JSON.stringify(habitaciones), (err,reply)=>{
          if (err) console.log(err);
          console.log(reply);
          res.send(habitaciones);
        }); 
      })
      .catch(error => res.status(400).send(error));
  });
});

/* POST Añadir una habitación. */
router.post("/", function (req, res, next) {
  let nueva_Habitacion = {
    id_tipo: req.body.id_tipo,
  };

  Habitacion.create(nueva_Habitacion)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Un error ocurrió al crear la Habitacion.",
      });
    });
});

/* PUT Actualizar una habitación. */
router.put("/:num_habitacion", (req, res, next) => {
  let { num_habitacion } = req.params;
  let habitacion_actualizada = {
    id_tipo: req.body.id_tipo,
    updatedAt: new Date(),
  };

  Habitacion.update(habitacion_actualizada, {
    where: { num: num_habitacion },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Habitacion numero ${num_habitacion} actualizada exitosamente`,
        });
      } else {
        res.send({
          message: `No fué posible actualizar la habitación numero ${num_habitacion}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al actualizar la habitación numero ${num_habitacion}.
        ${err}`,
      });
    });
});

/* DELETE Eliminar una habitación. */
router.delete("/:num_habitacion", function (req, res, next) {
  let { num_habitacion } = req.params;

  Habitacion.destroy({
    where: { num: num_habitacion },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Habitacion numero ${num_habitacion} eliminada exitosamente`,
        });
      } else {
        res.send({
          message: `No fué posible eliminar la habitación numero ${num_habitacion}.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al eliminar habitación numero ${num_habitacion}.
        ${err}`,
      });
    });
});
//==============================================================================

//========================= Tipos de Habitaciones ================================
/* GET Todas los tipos de habitaciones. */
router.get("/tipos", function (req, res, next) {
  client.get('tipos_habitaciones',(err,reply)=>{
    if(reply){
      //console.log('deredis');
      //console.log(reply);
      return res.json(JSON.parse(reply));
    }

    Tipo_Habitacion.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    })
      .then(tipos_habitaciones => {
        client.set('tipos_habitaciones',JSON.stringify(tipos_habitaciones), (err,reply)=>{
          if (err) console.log(err);
          console.log(reply);
          res.send(tipos_habitaciones);
        }); //esto es un objeto y redis guarda un string así que debes convertirlo
          //con JSON.stringify({objeto})
        
      })
      .catch(error => res.status(400).send(error));
  });
});
//==============================================================================

module.exports = router;
