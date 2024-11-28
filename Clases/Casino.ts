import * as readlineSync from 'readline-sync'
import { Cliente } from './Cliente';
import { JuegoSlot } from "./JuegoSlot";
import { elegirJuegos, leerInstruccionesDado } from '../MenuCasino';

export class Casino {
    private cliente: Cliente[];
    private juegos:JuegoSlot[];
    private nombre : string;

    constructor() {
        this.juegos = []; 
        this.cliente = [];
        this.nombre = "BinBaires"
    }

    getNombre():string{
        return this.nombre
    }
    getCliente (){
        return this.cliente
    }

    public agregarCliente (cliente:Cliente):void{
        if (cliente.getEdad()<18){
            console.log ("Tienes que ser mayor de 18 años para poder entrar"); //valida la edad del cliente
        }else{
            this.cliente.push(cliente); 
            console.log  ("El cliente: ",cliente.getNombre(), "fue agregado al casino"); 
        }
    }

    //METODO PARA AGREGAR JUEGOS AL CASINO
    public agregarJuegos(juego:JuegoSlot): void{
        this.juegos.push(juego);
        console.log ("El juego : ", juego.getNombre(), `fue agregado al casino`); 
    }
    

}
