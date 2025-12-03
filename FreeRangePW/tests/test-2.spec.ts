class Persona{
    nombre: string;
    edad: number;
    
    constructor(nombre: string, edad: number) {
        this.nombre=nombre;
        this.edad=edad;
    }

    //la funcion dentro de la clase no necesita ser declarada
    mostarDetalles() {
        console.log(`Nombre: ${this.nombre}, edad: ${this.edad}`);
    }
}

//una funcion fuera de la clase
function restar(a: number, b: number): number {
    return a - b;
}