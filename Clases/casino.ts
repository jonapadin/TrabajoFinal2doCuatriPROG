import * as readlineSync from 'readline-sync'
import { JuegoSlot } from "./JuegoSlot";
import { Cliente } from './Cliente';




export class Casino {
    private cliente: Cliente[];
    private juegos:JuegoSlot[];

    constructor() {
        this.juegos = []; 
        this.cliente = [];
 
    }

  
    public agregarCliente (cliente:Cliente):void{
        if (cliente.getedad()<18){
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

            
            console.log("**********************************************************"); 
            console.log (`Bienvenido al CASINO ! , Selecciona un juego :  `, cliente.getNombre()); 
            console.log("**********************************************************"); 

            //Mostrar juegos
            this.juegos.forEach((JuegoSlot, index) => {
                console.log (`${index + 1}.` , JuegoSlot.getNombre(), "- Costo: ", JuegoSlot.getApuestaMinima());
            });
            console.log(`${this.juegos.length + 1}. Agregar Saldo `);

            console.log("---------------------------------------------------"); 

            //Leer opcion del cliente
            const opcion = readlineSync.questionInt("Elige una opcion: "); 

            //Validar la opcion
            if (opcion > 0 && opcion <= this.juegos.length){
                const juegoSeleccionado = this.juegos[opcion-1];
               juegoSeleccionado.jugar();  
            }

            //Opcion de recarga
            if (opcion === this.juegos.length+1){
                const recargaSaldo = readlineSync.questionInt("Cuanto dinero desea ingresar a su cuenta ?"); 
                cliente.agregarSaldo(recargaSaldo); 
            }

        }
    }


}

    // administrarJuegos():void{

    // }
  
