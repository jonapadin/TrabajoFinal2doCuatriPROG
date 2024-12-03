import { Maquina } from "./Maquina";

export class Tragamoneda extends Maquina {
    private saldo: number;
    private apuesta: number;
    
    constructor(nombre: string, apuestaMinima: number, saldoInicial: number) {
        super(nombre, apuestaMinima);
        this.saldo = saldoInicial;
        this.apuesta = 0;
    }

    

    iniciarJuego(): void {
        console.log("Iniciando el juego de tragamonedas: " + this.nombre);
    }



    generarResultado(): void {

        console.log("Generando el resultado...");
    }

    retirarse(): void {
        console.log("Te has retirado del juego.");
    }

    jugar(): void {
        if (this.saldo < this.apuestaMinima) {
            console.log("Saldo insuficiente para jugar.");
            return;
        }
        console.log("Jugando en el tragamonedas...");

    }


    realizarApuesta(): number {
        console.log("Realizando apuesta...");
        this.apuesta = this.apuestaMinima;  
        return this.apuesta;
    }

    mostrarSaldo(): void {
        console.log("Saldo actual: " + this.saldo);
    }

    multiplicador(): void {

        let multiplicador = Math.random() * 10;
        console.log("Multiplicador de la jugada: " + multiplicador);
    }

    leerInstrucciones(): void {
        console.log("instrucciones")
    }


    public validarSaldo(saldo: number): number {
        if (saldo < this.apuestaMinima) {
            console.log("Saldo insuficiente.");
            return 0;
        }
        return saldo;
    }
}