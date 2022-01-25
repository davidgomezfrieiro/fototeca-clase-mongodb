let fotos = [];

exports.añadirNuevaImagen = (titulo, url, fecha, color) => {

    let imagen = {
        titulo,
        url,
        fecha,
        color
    };

    fotos.push(imagen);

    ordenarFechaDecreciente(fotos);
};

exports.existeImagenBBDD = (url) => {

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
};

exports.obtenerImagenes = () => {
    return fotos;
};


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
