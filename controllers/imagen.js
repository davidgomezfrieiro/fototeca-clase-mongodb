// import getColorFromURL function from color-thief-node
const { getColorFromURL } = require('color-thief-node');

const Imagen = require('../models/imagen');

exports.getAllImages = function (req, res) {

    let fotos = obtenerImagenes();

    res.render("index", {
        numFotos: fotos.length,
        fotos, // si la propiedad del objeto y el valor de donde la obtienes se llaman igual; no hace falta fotos:fotos
        path: req.route.path
    });
};

exports.getNewImage = (req, res) => {
    console.log("Valor de la ruta: ", req.route);
    res.render("form", {
        error: "",
        path: req.route.path
    });
};

exports.postNewImage = async (req, res) => {

    // req.body es un objeto con todas los campos que nos viene del formularo
    // req.body.nombre
    // req.body.url
    // req.body.fecha

    //     let { nombre: titulo, url, fecha } = req.body;
    // Asigna a las variables url y fecha, los valores de req.body.url y req.body.fecha respectvamente
    // nombre:titulo, permite renombrar la variable proveniente de req.body.nombre a una variable local llamada 'titulo'

    let { nombre: titulo, url, fecha } = req.body;

    if (titulo.length > 10) {
        console.log(error); // enviar un correo a develop@altia.com con lo que ha pasado
        res.send("Algo ha ido mal al insertar la foto...prueba más tarde.");
        return;
    }

    // let fotoExiste = existeImagenBBDD(url);

    // if (fotoExiste) {
    //     // Devolver al usuario a la página del formularo indicándole que la URL ya existe
    //     res.status(409).render("form", {
    //         error: `La URL ${req.body.url} ya existe.`,
    //         path: req.route.path
    //     })

    //     return; // debo salir de la función para no ejecutar más código
    // }

    let color = await obtenerColorPredominante(req.body.url);

    //añadirNuevaImagen(titulo, url, fecha, color);
    const imagen = new Imagen({
        titulo,
        url,
        fecha,
        color
    });

    let resultado;
    try {
        resultado = await imagen.save();
    }
    catch (error) {
        console.log(error); // enviar un correo a develop@altia.com con lo que ha pasado
        res.send("Algo ha ido mal al insertar la foto...prueba más tarde.");
        return;
    }
    // TONOTTODO: No hay por que informar al cliente del ID de la foto que hemos creado en base datos 
    res.send(`He insertado la foto en base de datos y su ID es ${resultado._id}`);

    // 3. Redirigimos al usuario a la lista de imágenes
    //res.redirect('/');
};

async function obtenerColorPredominante(url) {
    return await getColorFromURL(url);
}