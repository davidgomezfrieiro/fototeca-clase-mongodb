# Acabar persistencia Mongoose

## Requisito 1

Poder listar de nuevo todas las imágenes. Debemos usar el método adecuado de Mongoose para recuperar todas las imágenes y pasarselas a la vista

## Requisito 2

Debe volver a funciona la funcionalidad "ExisteFotoEnBBDD". Debemos comprobar si existe la foto en Atlas y en tal caso, devolver el mensaje de error en la vistal tal y como hacíamos antes

## Requisito 3

Añadir un formulario para poder filtrar el listado de fotos por los siguientes campos:

- Título. Si la foto contiene parte de la palabra que le pongamos en el campo "titulo"; debe aparecer en la lista de fotos de la vista
- Fecha: Poder ordenar por fecha creciente o decreciente (select box?) (creciente/decreciente).

Utilizar métodos de mongoose para filtrar los datos y para ordenar los datos.
