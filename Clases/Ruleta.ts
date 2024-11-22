import { JuegoSlot } from "./JuegoSlot";
import { questionInt } from 'readline-sync';
import * as readlineSync from 'readline-sync'


export class Ruleta extends JuegoSlot {
    private bola: number = 0;
    private numerosRojos: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    private numerosNegros: number[] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 31, 33, 35];
    private numeroVerde: number = 0;

    constructor() {
        super("Ruleta Smash", 250)
    }


    public girarRuleta() {
        this.bola = Math.floor(Math.random() * 3);

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
        console.log("Espere por favor, se esta iniciando el juego Ruleta Smash")

    }
    jugar(): void {


    }
    generarResultado(): void {
        if (this.realizarApuesta === this.girarRuleta) {
            console.log("Fue tu jugada GANADORA!")
        } else {
            console.log("PERDISTE :(")
        }

    }

    retirarse(): void {

    }
    mostrarSaldo(): void {

    }
    // numeroAleatorio(): void {

    // } metodo Numero aleatorio no va ya que lo genera aleatoriamente el metodo girar Ruleta.
    instrucciones(): void {

    }

    multiplicador(): void {

    }
    realizarApuesta(): number {
        let apuesta = readlineSync.questionInt("Ingrese el numero a apostar:  ")

        console.log(apuesta)
        return apuesta;
    }

}