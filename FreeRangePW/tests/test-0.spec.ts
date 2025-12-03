let edad: number = 25; //Variable "edad" de tipo number
let altura: number =175.5;

//operaciones numericas
let suma1: number = edad +10;
let promedio: number = (edad+altura)/2;

let primerNombre: string = "Juan"; //variable tipo string
let apellido: string = 'Lopez'; // se puede usar comillas simples

let nombreCompleto: string = primerNombre + " " + apellido;// concatenacion de cadenas

let estaActivo: boolean = true; //variable tipo boolean
let estaLogueado: boolean = false; //variable tipo boolean

//Condicionales
if(estaActivo){
    console.log("El usuario esta activo");
}else{
    console.log("El usuario no esta activo");
}

let numeros: number[] = [1, 2, 3, 4, 5]; // arreglo de numeros
let frutas: string[] = ["apple","banana","orange"]; //arreglo de string

console.log(numeros[2]); // acceso al tercer elemento (indice 2)
console.log(frutas.length); //Tamaño del arreglo

let persona1: [string, number] = ["Alice", 30]; // tupla de nombre y edad
let coordenadas: [number, number] = [45.6, -73.8]; // tupla de coordenadas

console.log(persona1[0]); // acceso nombre
console.log(coordenadas[1]); //acceso a la longitud

enum Color {
    Rojo,
    Verde,
    Azul
}

let colorElegido: Color = Color.Verde;

if (colorElegido === Color.Verde) {
    console.log("El color elegido es Verde");
}

let nombreInferido = "Alice"; // typeScript infiere que es un tipo string
let edadInferida= 25; // typeScript infiere que es un tipo number

//nombreInferido=42; // error . no se puede asignar un numero a una variable tipo string.