const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "asdasd123",
  database: "holamundo",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL");
});

app.post("/usuarios", (req, res) => {
  const { correo, nombre, apellido, region, comuna, direccion, password } =
    req.body;
  const sql = `INSERT INTO usuarios (correo, nombre, apellido, regiones, comunas, direccion, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    correo,
    nombre,
    apellido,
    regiones,
    comunas,
    direccion,
    password,
  ];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al guardar el usuario");
    } else {
      console.log("Usuario guardado exitosamente");
      res.status(200).json({ message: "Usuario guardado exitosamente" });
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor API corriendo en http://localhost:3000");
});
