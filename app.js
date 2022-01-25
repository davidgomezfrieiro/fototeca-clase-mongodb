// Importamos la biblioteca de terceros 'express'
const express = require('express');

// Importar todas las rutas
const imagesRoutes = require('./routes/imagen');

// Crear una nueva instancia del objeto Express
const app = express();

// Si te vienen peticiones POST; procesalas adecuadamente (enriquece el objeto req con la propiedad body)
app.use(express.urlencoded({ extended: false }))

// Ofrece una carpeta en el servidor para poder 'colgar' todos los recursos que deben ser accedidos sin reestrición y de manera directa por parte del cliente
app.use(express.static('public'));

// el método .set modifica una característica de nuestro servidor. Mi motor por defecto de plantillas va a ser EJS
app.set('view engine', 'ejs');

// Registro todas las rutas en el app
app.use(imagesRoutes);

app.listen(3000);