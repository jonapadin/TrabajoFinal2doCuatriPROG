import { JuegoSlot } from "./JuegoSlot";
import { questionInt } from 'readline-sync';
import * as readlineSync from 'readline-sync'
import { Cliente } from "./cliente"


export class Ruleta extends JuegoSlot {
    private bola: number = 0;
    private numerosRojos: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    private numerosNegros: number[] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 31, 33, 35];
    private numeroVerde: number = 0;
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super("Ruleta Smash", 250)
        this.cliente = cliente
    }


    public girarRuleta(): number {
        this.bola = Math.floor(Math.random() * 2);

        if (this.bola === this.numeroVerde) {
            console.log("La bola ha caído en el número verde (0).");
        } else if (this.numerosRojos.includes(this.bola)) {
            console.log(`La bola ha caído en ${this.bola} rojo.`);
        } else if (this.numerosNegros.includes(this.bola)) {
            console.log(`La bola ha caído en ${this.bola} negro.`);
        }
        return this.bola
    }

    //mensaje de que se esta iniciando el juego para luego apostar
    iniciarJuego(): void {
        console.log(`Espere por favor, se esta iniciando el juego ${this.nombre}`)
    }

    jugar(): void {
        console.clear(); 
        let seguirJugando = true; 

        while(seguirJugando){
            this.generarResultado();

            const seguir = readlineSync.keyInYN("Queres jugar de nuevo o Salir ? "); //apretar y o n para seguir
                if (!seguir){
                    console.log ("Muchas gracias por Jugar con nosotros!"); 
                    seguirJugando = false; 
                }
        }
    }

    generarResultado(): void {
        const apuesta = this.realizarApuesta(); //llama a realizarApuesta, "ingrese un numero para apostar"
        const resultadoRuleta = this.girarRuleta();
        
        if (apuesta === resultadoRuleta) {
            console.log("Fue tu jugada GANADORA!")
            const ganancia = this.cliente.agregarSaldo(this.apuestaMinima * 2) //agrego el saldo ganador 
        } else {
            console.log("PERDISTE :(")
            const perdida = this.cliente.apostar(this.apuestaMinima); //envio por parametro el valor de la apuesta minima para descontarle el valor de la jugada
        }
    }

    retirarse(): void {

    }

    mostrarSaldo(): void {
       console.log (this.cliente.getSaldo())
    }

    instrucciones(): string {
        return "HOlu"
    }

    multiplicador(): void {

    }

    realizarApuesta(): number {
        let apuesta = readlineSync.questionInt("Ingrese el numero a apostar:  ")
        if (apuesta >= 0 && apuesta <= 36) {
            console.log(apuesta)
        } else {
            console.log("El numero es invalido. Ingrese un numero entre 0 y 36")
            console.log("________________________")
            return this.realizarApuesta(); //vuelve a pedir un numero para apostar
        }
        return apuesta;
    }
}

//hay que corregir el saldo cuando imprime en consola.