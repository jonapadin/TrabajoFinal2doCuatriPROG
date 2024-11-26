import { Cliente } from "./Cliente";
import { Tragamoneda } from "./Tragamoneda";
import * as readlineSync from 'readline-sync';

export class TragamonedaFruit extends Tragamoneda {
    private valor1: string;
    private valor2: string;
    private valor3: string;
    private valoresPosibles: string [];
    private cliente: Cliente;

    constructor(apuestaMinima: number, cliente: Cliente, saldoInicial:number) {
        super("Fruit King",apuestaMinima,saldoInicial);
        this.valor1 = "";
        this.valor2 = "";
        this.valor3 = "";
        this.cliente = cliente;
        this.valoresPosibles = ["Fresa","Limon","Sandia"];
    }

    iniciarJuego(): void {
        console.log(`Estas iniciando el juego ${this.getNombre()}`);
    }

    generarResultado(): void {
        if( this.valoresPosibles.length === 0) {
            console.error("Maquina fuera de servicio!");
            return;
        }

        this.valor1 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
        this.valor2 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
        this.valor3 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];

        console.log(`Resultado: ${this.valor1} | ${this.valor2} | ${this.valor3}`);
        
    }

    realizarApuesta(): number {
        let apuesta = readlineSync.questionInt("Ingrese apuesta:");

        if(apuesta > this.cliente.getSaldo()){
            console.log("Saldo insuficiente!");
            return this.realizarApuesta();            
        } else if (apuesta < this.apuestaMinima) {
            console.log(`La apuesta minima es de ${this.apuestaMinima}`);
            return this.realizarApuesta();
        }

        console.log(`Apuesta aceptada: ${apuesta}`);
        
        return apuesta;
    }

    juegoGanador(): boolean {
        const apuesta = this.realizarApuesta();
    

        if (this.valor1 === this.valor2 && this.valor2 === this.valor3) {

            if (this.valor1 === "Fresa") {
                console.log("¡Ganaste el premio Major con 3 Fresas!");
                this.cliente.agregarSaldo(this.apuestaMinima * 5); 
                console.log(`Saldo actual: ${this.cliente.getSaldo()}`);
                return true;
            } 

            else if (this.valor1 === "Limón") {
                console.log("¡Ganaste el premio Mini con 3 Limones!");
                this.cliente.agregarSaldo(this.apuestaMinima * 2); 
                console.log(`Saldo actual: ${this.cliente.getSaldo()}`);
                return true;
            } 

            else if (this.valor1 === "Sandía") {
                console.log("¡Ganaste el Jackpot con 3 Sandías!");
                this.cliente.agregarSaldo(this.apuestaMinima * 10); 
                console.log(`Saldo actual: ${this.cliente.getSaldo()}`);
                return true;
            } 
        }
    

        console.log("Lo siento, no has ganado esta vez.");
        this.cliente.apostar(this.apuestaMinima);
        console.log(`Tu saldo es ahora: ${this.cliente.getSaldo()}`);
        return false; 
    }

    retirarse(): void {
        console.log("Te has retirado del juego. ¡Gracias por jugar!");
    }


    mostrarSaldo(): void {
        console.log(`Saldo actual: ${this.cliente.getSaldo()}`);
    }


    instrucciones(): string {
        return "¡Bienvenido a Fruit King! Para jugar, realiza una apuesta y espera los resultados. Si obtienes tres símbolos iguales, ¡ganas un premio mayor! Si tienes dos iguales, ganas parcialmente. ¡Buena suerte!";
    }


    jugar(): void {
        let seguirJugando = true;

        while (seguirJugando) {
            console.clear();
            this.iniciarJuego();
            this.generarResultado();
            this.juegoGanador();
            this.mostrarSaldo();

            const seguir = readlineSync.keyInYNStrict("¿Quieres jugar de nuevo o salir? (Y/N)");
            if (!seguir) {
                console.log("¡Muchas gracias por jugar con nosotros!");
                seguirJugando = false;
            }
        }
    }

}