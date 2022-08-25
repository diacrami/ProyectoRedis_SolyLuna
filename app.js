const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authenticationRouter = require("./routes/authentication");
const habitacionesRouter = require("./routes/habitaciones");
const usuariosRouter = require("./routes/usuarios");
const reservasRouter = require("./routes/reservas");
const contactoRouter = require("./routes/contacto");


const responseTime= require('response-time');
const redis= require('redis');
const client=redis.createClient({ //para conectarse a redis creas un cliente y le pasas un objeto, el cual recibe la propiedad host
    host: 'localhost', // es para decirle a redis donde esta la base de datos de redis
    port: 6379
});

const app = express();

//Middlewares.
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(responseTime());
app.use("/api/habitaciones", habitacionesRouter);
app.use("/api/auth", authenticationRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/reservas", reservasRouter);
app.use("/api/contacto", contactoRouter);




module.exports = {
  app,
};
