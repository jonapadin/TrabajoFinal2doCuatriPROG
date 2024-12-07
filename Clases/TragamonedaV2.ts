import { Cliente } from "./Cliente";
import * as readlineSync from 'readline-sync';
import { Tragamoneda } from "./Tragamoneda";
import * as fs from 'fs';

export class TragamonedaFruit extends Tragamoneda {
    private valor1: string;
    private valor2: string;
    private valor3: string;
    private valoresPosibles: string [];

    constructor(cliente?: Cliente) {
        super("🍓🍋🍉Fruit King",50);
        this.valor1 = "";
        this.valor2 = "";
        this.valor3 = "";
        this.cliente = cliente;
        this.valoresPosibles = ["🍓","🍋","🍉"];
    }

    public iniciarJuego(): void {
        console.log(`⏳¡Estás iniciando el juego ${this.getNombre()}!⌛`);
    }

    public realizarApuesta(): number {
        let apuesta:number = readlineSync.questionInt("💰 Ingrese apuesta: ");
        if (this.cliente) {
            if (apuesta > this.cliente.getSaldo()) {
                console.log("❌ Saldo insuficiente!");
                return this.realizarApuesta(); 
            } else if (apuesta < this.apuestaMinima) {
                console.log(`💰 La apuesta mínima es de ${this.apuestaMinima}`);
                return this.realizarApuesta(); 
            }
        }
    
        console.log(`✔ Apuesta aceptada: ${apuesta}`);
        return apuesta;
    }

    public generarResultado(): void {
        if( this.valoresPosibles.length == 0) {
            console.error("❌ Maquina fuera de servicio!");
            return;
        }

        this.valor1 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
        this.valor2 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
        this.valor3 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];

        console.log(`🎰Resultado: ${this.valor1} | ${this.valor2} | ${this.valor3}`);
        
    }

    public juegoGanador(): boolean {
        if (!this.cliente) {
            console.log("❌ No hay cliente asociado.");
            return false;
        }

        if (this.valor1 == this.valor2 && this.valor2 == this.valor3) {

            if (this.valor1 == "🍓") {
                console.log("🎉¡Ganaste el premio Major con 3 🍓!");
                this.cliente?.agregarSaldo(this.apuestaMinima * 5); 
                console.log(`💰Saldo actual: ${this.cliente?.getSaldo()}`);
                return true;
            } 

            else if (this.valor1 == "🍋") {
                console.log("🎉¡Ganaste el premio Mini con 3 🍋!");
                this.cliente?.agregarSaldo(this.apuestaMinima * 2); 
                console.log(`Saldo actual: ${this.cliente?.getSaldo()}`);
                return true;
            } 

            else if (this.valor1 == "🍉") {
                console.log("¡Ganaste el Jackpot con 3 🍉!");
                this.cliente?.agregarSaldo(this.apuestaMinima * 10); 
                console.log(`Saldo actual: ${this.cliente?.getSaldo()}`);
                return true;
            } 
        }
 
        console.log("😥 Lo siento, no has ganado esta vez.");
        this.cliente?.apostar(this.apuestaMinima);
        console.log(`💰 Tu saldo es ahora: ${this.cliente?.getSaldo()}`);
        return false; 
    }
    
    public mostrarSaldo(): void {
        if (this.cliente) {
            console.log(`💰 Saldo actual: ${this.cliente.getSaldo()}`);
        } else {
            console.log("❌ Cliente no está disponible.");
        }
    }

    public jugar(): void {
        console.clear();
        this.iniciarJuego();
        this.generarResultado();
        this.juegoGanador();
        this.mostrarSaldo();

    let seguirJugando:boolean = true;
    let pregunta:string = readlineSync.question(" Deseas seguir jugando?: ").toLowerCase();
    if(pregunta == "si") {
        this.generarResultado();
        this.juegoGanador();
        this.mostrarSaldo();
    } else if(pregunta == "no") {
        seguirJugando = false;
    }
 }
}