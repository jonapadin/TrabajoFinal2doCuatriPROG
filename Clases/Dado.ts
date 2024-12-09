import { Maquina } from "./Maquina";
import * as readlineSync from 'readline-sync'

import { Cliente } from "./Cliente";

export class Dado extends Maquina {

    private cliente?: Cliente;

    constructor(cliente?: Cliente) {
        super("da2", 250)
        this.cliente = cliente;
    }

    public iniciarJuego(): void {
        console.log(`El juego ${this.nombre} se esta iniciando...`);
    }

    public generarResultado(): void {
        const apuesta = this.realizarApuesta();
        console.log("Lanzando el dado ... ");
        const resultado = Math.floor(Math.random() * 6) + 1;
        console.log(`El resultado es: ${resultado}`);
        if (apuesta == resultado) {
            console.log("Felicitaciones! usted gano ...");
            this.cliente?.agregarSaldo(this.apuestaMinima * 2) //agrego el saldo ganador 
        } else {
            console.log("Perdio...");
            this.cliente?.apostar(this.apuestaMinima); //envio por parametro el valor de la apuesta minima para descontarle el valor de la jugada
        }
    }

    public realizarApuesta(): number {
        let opcion: number;
        do {
            opcion = readlineSync.questionInt("Debe elegir un numero del 1 al 6: ");
        }
        while (opcion < 1 || opcion > 6)
        return opcion;
    }

    public mostrarSaldo(): void {
        console.log(`Saldo actual: ${this.cliente?.getSaldo()}`);
    }

    public jugar(): void {
        let seguirJugando = true;

        while (seguirJugando) {
            console.clear();
            this.iniciarJuego(); //interface
            this.generarResultado();
            this.mostrarSaldo();
            const seguir = readlineSync.keyInYN("Queres jugar de nuevo o Salir ? "); //apretar y o n para seguir
            if (!seguir) {
                console.log("Muchas gracias por Jugar con nosotros!");
                seguirJugando = false;
            }
        }
    }
}   