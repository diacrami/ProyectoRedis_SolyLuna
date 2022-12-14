const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const Usuario = require("../db/models").Usuario;

//========================== Authentication ====================================
router.post("/login", function (req, res) {
  const { username, password } = req.body;

  if (typeof username === "undefined" || typeof password === "undefined") {
    res.status(400).send({
      error:
        "Incomplete credentials. Should receive 'username' and 'password' params",
    });
    return;
  } else if (!username || !password) {
    res.status(400).send({
      error: "The params value can't be falsy values",
    });
    return;
  }

  Usuario.findOne({
    where: { username },
  })
    .then(user => {
      bcrypt.compare(password, user.passwordHash, (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result) {
          //Token creation.
          const payload = {
            id: user.id,
            username,
            email: user.email,
          };

          jwt.sign(payload, process.env.TOKEN_PRIVATE_KEY, (err, token) => {
            if (err) {
              console.log(err);
            }
            res.status(200).send({
              message: `Success authentication`,
              token,
            });
          });
        } else {
          //Incorrect password.
          res.status(401).send({
            error: `Invalid user or password`,
          });
        }
      });
    })
    //Not signed up user.
    .catch(err => {
      console.log(err);
      res.status(401).send({
        error: `Invalid user or password`,
      });
    });
});

module.exports = router;
