// find

let animales = ["Gato", "Perro", "Avestruz", "Tamil"];

// Oye, búscame si existe un anínam que tenga más de 4 letras
let resultado = animales.some(animal => animal.length > 14)
console.log(resultado);