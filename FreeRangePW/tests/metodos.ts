
// llamado a metodo de clase
const persona = new Persona("Alice", 30);
persona.mostarDetalles();

//funcion simple
function sumar(a: number, b: number): number {
    return a + b;
}

const resultadoSuma = sumar(5, 3);
console.log('resultado de la suma: ', resultadoSuma);

//Funcion flecha basica
const suma = (a: number, b: number): number => {
    return a+b;
}

const resultadoSumaFlecha = suma(5, 3);
console.log('resultado de la suma flecha: ', resultadoSumaFlecha);

//Funcion flecha sin parentesis al rededor de un solo parametro
const esPar = num => num % 2 === 0;
console.log('el numero 6 es par?: ', esPar(6));

//Funcion flecha con cuerpo implicito
const saludar = nombre => `Hola: ${nombre}`;
console.log(saludar("Alice"));

//Funcion flecha en mapeo de arreglo
const numeros2 = [1, 2, 3, 4, 5];
const alCuadrado = numeros2.map(num => num * num);

console.log("Arreglo original: ", numeros2);
console.log("Arreglo al cuadrado: ", alCuadrado);
