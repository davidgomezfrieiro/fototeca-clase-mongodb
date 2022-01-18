// Importamos la biblioteca de terceros 'express'
const express = require('express');

// Crear una nueva instancia del objeto Express
const app = express();

// Si te vienen peticiones POST; procesalas adecuadamente (enriquece el objeto req con la propiedad body)
app.use(express.urlencoded({ extended: false }))


// Define un endpoint a la URL '/', método GET, y ejecutrá la función de callback del segundo parámetro cada vez que reciba una petición

app.get('/', function (req, res) {
    res.send(`<h1>Bienvenido a la fototeca, campeón/a!</h1>
    `);
})

app.get('/nueva-foto', (req, res) => {
    res.sendFile(__dirname + "/form.html");
});

// endpoint recibir peticiones de tipo POST a '/nueva-foto'; y de momento, simplemente hacer un console.log del objeto req.body
app.post('/nueva-foto', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});


app.listen(3000);