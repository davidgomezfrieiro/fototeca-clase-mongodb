// Importamos la biblioteca de terceros 'express'
const express = require('express');

// Importamos el módulo de mongoose
const mongoose = require('mongoose');

// Uri
const uri = "mongodb+srv://root:root@cluster0.pycqe.mongodb.net/fototeca";

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

// Nos concetaremos a la BBDD de Atlas y luego levantaremos la app en el puerto 3000

mongoose.connect(uri, (err) => {

    if (err) {
        console.log(`Ha ocurrido el siguiente error al conectarnos a la base de datos ${err}`);
        return;
    };

    app.listen(3000);

});
