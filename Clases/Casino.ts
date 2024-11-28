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
    
    public menu(cliente:Cliente): void{

        let seguirEnMenu = true;

        while (seguirEnMenu){

            
            console.log("******************************************************************************"); 
            console.log (`Bienvenido ${cliente.getNombre()} a el casino: ${this.nombre} !. Tu saldo actual es de: ${cliente.getSaldo()}`); 
            console.log("******************************************************************************"); 

            //Mostrar juegos
            this.juegos.forEach((JuegoSlot, index) => {
                console.log (`${index + 1}.` , JuegoSlot.getNombre(), "- Costo: ", JuegoSlot.getApuestaMinima());
            });
            console.log(`1. Agregar Saldo `);
            console.log(`2. Seleccionar juegos`);
            console.log(`3. Ver Instrucciones`);
            console.log(`4. Retirar dinero`);
            console.log(`5. Cerrar sesion`);

            console.log("-----------------------------------------------------------------"); 
            //Leer opcion del cliente
            const opcion = readlineSync.questionInt("Elige una opcion: "); 

            switch(opcion){
                case 1:
                //Opcion de recarga
                const recargaSaldo = readlineSync.questionInt("Cuanto dinero desea ingresar a su cuenta?: "); 
                cliente.agregarSaldo(recargaSaldo);
                    break
                case 2:
                    elegirJuegos();
                    break
                case 3:
                    leerInstruccionesDado();
                    break
                default: console.log("Eliga una opcion valida")
            }
        }
    }
}
