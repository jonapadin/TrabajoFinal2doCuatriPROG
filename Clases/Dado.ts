import { JuegoSlot } from "./JuegoSlot";
import * as readlineSync from 'readline-sync'
import * as Cliente from "./Cliente";

export class Dado extends JuegoSlot{
  
    private cliente: Cliente.Cliente; //agrego...

    constructor ( cliente:Cliente.Cliente){
        super("da2",250)
        this.cliente = cliente; //agrego
    }

    public combinacionGanadora(){
      
    }

    public tirarDado(){
      const apuesta = this.realizarApuesta();
      console.log ("Lanzando el dado ... ");
      const resultado = Math.floor(Math.random()*6) +1;
      console.log (`El resultado es: ${resultado}`);
      if (apuesta === resultado){
          console.log ("Felicitaciones! usted gano ..."); 
          const ganancia = this.cliente.agregarSaldo(this.apuestaMinima * 2) //agrego el saldo ganador 
      }else{
          console.log ("Perdio..."); 
          const perdida = this.cliente.apostar(this.apuestaMinima); //envio por parametro el valor de la apuesta minima para descontarle el valor de la jugada
      }
     }
     
     iniciarJuego(): void {
         console.log (`El juego ${this.nombre} se esta iniciando...`);
     }

     generarResultado(): void {
    
     }
     retirarse(): void {
         
     }
     
     realizarApuesta(): number {
      let opcion = readlineSync.questionInt("Debe elegir un numero del 1 al 6: "); 
      return opcion; 
     }

     mostrarSaldo(): void {
      console.log (this.cliente.getSaldo());
     }

    //  numeroAleatorio(): void {
         
    //  }
     multiplicador(): void {
         
     }
     instrucciones(): string{
       return "hola"; 
         
     }
     
      
    public jugar(): void {    
      let seguirJugando = true; 

      while(seguirJugando){
      console.clear(); 
      this.iniciarJuego(); //interface
      this.tirarDado(); 
      this.mostrarSaldo(); 
          const seguir = readlineSync.keyInYN("Queres jugar de nuevo o Salir ? "); //apretar y o n para seguir
            if (!seguir){
                console.log ("Muchas gracias por Jugar con nosotros!"); 
                seguirJugando = false; 
            }
        }
      }
      
  
     mostrarResultado(){//interface
     
    }
}
    
