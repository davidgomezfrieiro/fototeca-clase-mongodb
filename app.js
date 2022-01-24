// Importamos la biblioteca de terceros 'express'
const express = require('express');

// Crear una nueva instancia del objeto Express
const app = express();

// "Base de datos" de las fotos que me han subido al servidor
let fotos = [
    {
        titulo: 'Cosa',
        url: 'https://i.picsum.photos/id/260/200/200.jpg?hmac=Nu9V4Ixqq3HiFhfkcsL5mNRZAZyEHG2jotmiiMRdxGA',
        fecha: '2022-01-14'
    },
    {
        titulo: 'Cosa-2',
        url: 'https://i.picsum.photos/id/260/200/200.jpg?hmac=Nu9V4Ixqq3HiFhfkcsL5mNRZAZyEHG2jotmiiMRdxGA',
        fecha: '2022-01-12'
    },
    {
        titulo: 'Cosa-3',
        url: 'https://i.picsum.photos/id/260/200/200.jpg?hmac=Nu9V4Ixqq3HiFhfkcsL5mNRZAZyEHG2jotmiiMRdxGA',
        fecha: '2021-01-01'
    }
]

// Configuro el color del H1 FOTOTECA
let colorTitulo = "#346135";

// Si te vienen peticiones POST; procesalas adecuadamente (enriquece el objeto req con la propiedad body)
app.use(express.urlencoded({ extended: false }))

// Ofrece una carpeta en el servidor para poder 'colgar' todos los recursos que deben ser accedidos sin reestrición y de manera directa por parte del cliente
app.use(express.static('public'));

// el método .set modifica una característica de nuestro servidor. Mi motor por defecto de plantillas va a ser EJS
app.set('view engine', 'ejs');


// Define un endpoint a la URL '/', método GET, y ejecutrá la función de callback del segundo parámetro cada vez que reciba una petición

app.get('/', function (req, res) {
    res.render("index", {
        numFotos: fotos.length,
        fotos, // si la propiedad del objeto y el valor de donde la obtienes se llaman igual; no hace falta fotos:fotos
        colorTitulo,
        path: req.route.path
    });
})

app.get('/nueva-foto', (req, res) => {
    console.log("Valor de la ruta: ", req.route);
    res.render("form", {
        error: "",
        path: req.route.path
    });
});

// endpoint recibir peticiones de tipo POST a '/nueva-foto'; y de momento, simplemente hacer un console.log del objeto req.body
app.post('/nueva-foto', (req, res) => {
    let foto = {
        titulo: req.body.nombre,
        url: req.body.url,
        fecha: req.body.fecha
    }

    let fotoExiste = existeFotoBBDD(req.body.url);

    if (fotoExiste) {
        // Devolver al usuario a la página del formularo indicándole que la URL ya existe
        res.status(409).render("form", {
            error: `La URL ${req.body.url} ya existe.`,
            path: req.route.path
        })

        return; // debo salir de la función para no ejecutar más código
    }

    // 2 Añadir el objeto al array fotos
    fotos.push(foto);

    // Ordenamos el array de fotos 
    ordenarFechaDecreciente(fotos);

    // 3. Redirigimos al usuario a la lista de imágenes
    res.redirect('/');

    // 5. console
    console.log("Base de datos:", fotos);

});

/**
 * Función que determina si existe una foto en la base de datos 'fotos'
 * 
 * @param {string} url URL de la foto que quieres comprobar
 */
// function existeFotoBBDD(url) {
//     let existeFoto = false;
//     let i = 0;

//     while (!existeFoto && i < fotos.length) {
//         existeFoto = fotos[i].url == url;
//         i++;
//     }

//     return existeFoto;
// }

function existeFotoBBDD(url) {

    /**  [{
        titulo: 'Gato',
        url: 'http',
        fecha: '2012-03-13'
    }, {
        titulo: 'Perro',
        url: 'http222',
        fecha: '2012-03-13'
    },
    {
        titulo: 'Avestruz',
        url: 'http3',
        fecha: '2012-03-13'
    }
  ]

    */

    let encontrado = fotos.some(foto => url == foto.url)

    return encontrado;
}

function ordenarFechaDecreciente(fotos) {
    fotos.sort((foto1, foto2) => {
        // Si la fecha de la foto1 es mayor que la fecha de la foto2 (es más actual); debería ir más al principio
        // Más al principio significa que tenemos que devolver un número negativo (-1)

        if (foto1.fecha > foto2.fecha) {
            return -1;
        }

        if (foto1.fecha < foto2.fecha) {
            return 1;
        }

        return 0;
    });
}

app.listen(3000);