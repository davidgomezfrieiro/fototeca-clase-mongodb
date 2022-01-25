const express = require('express');

// Instanciar un nuevo objeto del tipo Router
const router = express.Router();

// Importar las funciones del controlador de esta misma entidad 'imagen'
const { getAllImages, getNewImage, postNewImage } = require('../controllers/imagen');

// Registrar la ruta "/" que va a mostrar el listado total de imágenes
// Define un endpoint a la URL '/', método GET, y ejecutrá la función de callback del segundo parámetro cada vez que reciba una petición

router.get('/', getAllImages);

router.get('/nueva-foto', getNewImage);

// endpoint recibir peticiones de tipo POST a '/nueva-foto'; y de momento, simplemente hacer un console.log del objeto req.body
router.post('/nueva-foto', postNewImage);

module.exports = router;
// Equivalente a exports.router = router;