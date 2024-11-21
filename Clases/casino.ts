import { Cliente } from "./cliente";
import * as readlineSync from 'readline-sync'


export class Casino {
    private cliente: Cliente[] = [];
    private validarEdad: boolean;
    //private juegos:Juegos[]=[]

    constructor(cliente: Cliente[], validadEdad: boolean) {
        this.cliente = cliente;
        this.validarEdad = validadEdad;

    }
    getCliente() {
        return this.cliente;
    }
    getValidarEdad() {
        return this.validarEdad;
    }
    public validacionEdad(): void {
        let edadMinima: number = 18
        //se pregunta la edad del usuario:
        const entrada= readlineSync.question('Por favor ingrese su edad')
        //se pasa la edad a numero:
        const edad:number = parseInt(entrada);

        
        if (isNaN(edad)) {
            console.log("Por favor ingresar un numero");
        }else if(edad>=edadMinima){
            console.log("Podes pasar a jugar");
           
        }else{
            console.log("Tienes que ser mayor de 18 años para poder entrar")
        }

    }
       
}


