
import { JuegoSlot } from "./JuegoSlot";
import { Cliente } from "./cliente";
import * as readlineSync from 'readline-sync'

export class Tragamonedas extends JuegoSlot {
    private rodillos: number;
    private lineaDePago: number;
    private valor1: number;
    private valor2: number;
    private valor3: number;
    private valoresPosibles: number[];
    private cliente: Cliente; //agrego...
  
    constructor(rodillos: number, lineaDePago: number, cliente:Cliente) {
      super ("Tragamonedas",100)
      this.rodillos = rodillos;
      this.lineaDePago = lineaDePago;
      this.valor1 = 0;
      this.valor2 = 0;
      this.valor3 = 0;
      // números del 1 al 10, pero el valor 7 tiene más probabilidades de salir
      this.valoresPosibles = [1, 2, 3, 4, 5, 6, 7, 7, 7, 8, 9, 10];
      this.cliente = cliente; //agrego...
    }
  
    // Método para generar una combinación aleatoria de los rodillos
    generarCombinacion() {
      this.valor1 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
      this.valor2 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
      this.valor3 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
  
      console.log(`Combinación generada: ${this.valor1}, ${this.valor2}, ${this.valor3}`);
    }
  
    // Método para verificar si el valor ingresado es parte de una combinación ganadora
    juegoGanador(): boolean {
      const apuesta = this.realizarApuesta(); //llama a realizarApuesta, "ingrese un numero para apostar"
      // Si todos los rodillos tienen el mismo valor, es victoria total
      if (this.valor1 === apuesta && this.valor2 === apuesta && this.valor3 === apuesta) {
        console.log(`¡Has ganado! La combinación completa de ${apuesta} es ganadora.`);
        const ganancia = this.cliente.agregarSaldo(this.apuestaMinima * 2) //agrego el saldo ganador 
        return true; // Victoria total
      }
  
      // Comprobamos si al menos dos rodillos tienen el valor
      let contador = 0;
      if (this.valor1 === apuesta) contador++;
      if (this.valor2 === apuesta) contador++;
      if (this.valor3 === apuesta) contador++;
  
      // Si al menos dos rodillos tienen el valor, es victoria parcial
      if (contador >= 1) {
        console.log(`¡Has ganado parcialmente! El valor ${apuesta} aparece en ${contador} rodillo(s).`);
        const perdida = this.cliente.apostar(this.apuestaMinima); //envio por parametro el valor de la apuesta minima para descontarle el valor de la jugada
        return true; // Victoria parcial
      }
      
      if (contador >= 2) {
        console.log(`¡Has ganado parcialmente! El valor ${apuesta} aparece en ${contador} rodillo(s).`);
        const perdida = this.cliente.apostar(this.apuestaMinima); //envio por parametro el valor de la apuesta minima para descontarle el valor de la jugada
        return true; // Victoria parcial
      }
  
      // Si no hay coincidencias suficientes
      console.log(`Lo siento, el valor ${apuesta} no está en la combinación.`);
      const perdida = this.cliente.apostar(this.apuestaMinima); //envio por parametro el valor de la apuesta minima para descontarle el valor de la jugada
      return false; // No hubo coincidencias suficientes
    }

    iniciarJuego(): void {
      console.log (`Estas iniciando el juego ${this.getNombre()}`);
    }

    generarResultado(): void {
      
    }

    retirarse(): void {
      
    }

    jugar(): void {
      let seguirJugando = true; 

        while(seguirJugando){
        console.clear(); 
        this.iniciarJuego();
        this.generarCombinacion();
        //this.realizarApuesta(); 
        this.juegoGanador(); 
        this.mostrarSaldo(); 
          const seguir = readlineSync.keyInYN("Queres jugar de nuevo o Salir ? "); //apretar y o n para seguir
            if (!seguir){
                console.log ("Muchas gracias por Jugar con nosotros!"); 
                seguirJugando = false; 
            }
        }
    }

    realizarApuesta(): number {
      let apuesta = readlineSync.questionInt("Ingrese el numero a apostar:  ")
      if (apuesta >= 1 && apuesta <= 10) {
          console.log(apuesta)
      } else {
          console.log("El numero es invalido. Ingrese un numero entre 1 y 10")
          console.log("________________________")
          return this.realizarApuesta(); //vuelve a pedir un numero para apostar
      }
      return apuesta;
    }

    mostrarSaldo(): void {
      console.log (this.cliente.getSaldo());
    }

    multiplicador(): void {
      
    }

    instrucciones(): string {
      return "Holis"
    }
  }
  