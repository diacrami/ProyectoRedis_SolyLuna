const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Usuario = require("../db/models").Usuario;
const Huesped = require("../db/models").Huesped;
const Celular = require("../db/models").Celular;

//============================= Usuarios =======================================
/* GET Todos los usuarios. */
router.get("/", function (req, res) {
  const { authorization } = req.headers;

  const redis= require('redis');
  const client=redis.createClient({ //para conectarse a redis creas un cliente y le pasas un objeto, el cual recibe la propiedad host
      host: 'localhost', // es para decirle a redis donde esta la base de datos de redis
      port: 6379,
  });
  client.get('lista_usuarios',(err,reply)=>{
    if(reply){
      //console.log('deredis');
      //console.log(reply);
      return res.json(JSON.parse(reply));
    }

    Usuario.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Huesped,
          attributes: {
            exclude: ["id_usuario", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Celular,
              as: "Celulares",
              attributes: {
                exclude: ["cedula_huesped", "createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
    })
      .then(usuarios => {
        client.set('lista_usuarios',JSON.stringify(usuarios), (err,reply)=>{
          if (err) console.log(err);
          console.log(reply);
          res.status(200).send(usuarios);
        }); //esto es un objeto y redis guarda un string así que debes convertirlo
          //con JSON.stringify({objeto})
        
      })
      .catch(error => res.status(400).send(error));
  });

  
  /*let token;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, (err, decodedToken) => {
    if (err) {
      console.log(err);
      res.status(401).send({
        error: `Token missing or invalid`,
      });
      return;
    }

    Usuario.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: Huesped,
          attributes: {
            exclude: ["id_usuario", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: Celular,
              as: "Celulares",
              attributes: {
                exclude: ["cedula_huesped", "createdAt", "updatedAt"],
              },
            },
          ],
        },
      ],
    })
      .then(usuarios => {
        res.status(200).send(usuarios);
      })
      .catch(error => res.status(400).send(error));
  });*/
});

/* GET Usuario por username. */
router.get("/:username", function (req, res) {
  let { username } = req.params;
  Usuario.findOne({
    where: { username },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Huesped,
        attributes: {
          exclude: ["id_usuario", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: Celular,
            as: "Celulares",
            attributes: {
              exclude: ["cedula_huesped", "createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
  })
    .then(usuario => {
      res.send(usuario);
    })
    .catch(error => res.status(400).send(error));
});

/* POST Añadir un usuario. */
router.post("/", function (req, res) {
  let { admin } = req.body;
  let adminBoolean = admin === "1";
  let nuevo_Usuario = {
    username: req.body.username,
    password: req.body.password,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    email: req.body.email,
    admin: adminBoolean,
  };

  Usuario.create(nuevo_Usuario)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client.",
      });
    });
});

/* PUT Actualizar un Usuario. */
router.put("/:id_usuario", (req, res) => {
  let { id_usuario } = req.params;
  let { admin } = req.body;
  let adminBoolean = admin === "1";
  let usuario_actualizado = {
    username: req.body.username,
    password: req.body.password,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    email: req.body.email,
    admin: adminBoolean,
    updatedAt: new Date(),
  };

  Usuario.update(usuario_actualizado, {
    where: { id: id_usuario },
    individualHooks: true,
  })
    .then(data => {
      if (data[0] == 1) {
        res.send({
          message: `Usuario '${id_usuario}' actualizado exitosamente`,
        });
      } else {
        res.send({
          message: `No fué posible actualizar el usuario '${id_usuario}'.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al actualizar el usuario '${id_usuario}'.
            Error: ${err}`,
      });
    });
});

/* DELETE Eliminar un Usuario. */
router.delete("/:id_usuario", function (req, res) {
  let { id_usuario } = req.params;

  Usuario.destroy({
    where: { id: id_usuario },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuario eliminado exitosamente",
        });
      } else {
        res.send({
          message: "No fué posible eliminar el usuario.",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al eliminar el usuario.
            Error: ${err}`,
      });
    });
});
//==============================================================================

//============================ Huespedes =======================================
/* POST Añadir un huesped. */
router.post("/huespedes", function (req, res) {
  let nuevo_Huesped = {
    cedula: req.body.cedula,
    id_usuario: req.body.id_usuario,
    pais: req.body.pais,
    ciudad: req.body.ciudad,
    fecha_nacimiento: req.body.fecha_nacimiento,
  };

  Huesped.create(nuevo_Huesped)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client.",
      });
    });
});

/* PUT Actualizar un Huesped. */
router.put("/huespedes/:id_usuario", (req, res) => {
  let { id_usuario } = req.params;
  let huesped_actualizado = {
    cedula: req.body.cedula,
    pais: req.body.pais,
    ciudad: req.body.ciudad,
    updatedAt: new Date(),
  };

  Huesped.update(huesped_actualizado, {
    where: { id_usuario },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Huesped '${id_usuario}' actualizado exitosamente`,
        });
      } else {
        res.send({
          message: `No fué posible actualizar el Huesped '${id_usuario}'.`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error al actualizar el Huesped '${id_usuario}'.
            Error: ${err}`,
      });
    });
});
//==============================================================================

module.exports = router;
