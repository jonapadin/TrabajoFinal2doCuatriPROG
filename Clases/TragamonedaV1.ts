import { Cliente } from "./Cliente";
import * as readlineSync from 'readline-sync';
import { JuegoSlot } from "./JuegoSlot";

export class TragamonedaLucky extends JuegoSlot {

    private valor1: number;
    private valor2: number;
    private valor3: number;
    private valoresPosibles: number[];
    private cliente: Cliente; 

    constructor(cliente: Cliente) {
        super("Lucky Slot", 100); // Nombre del juego y apuesta mínima
        this.valor1 = 0;
        this.valor2 = 0;
        this.valor3 = 0;
        // Números del 1 al 10, pero el valor 7 tiene más probabilidades de salir
        this.valoresPosibles = [1, 2, 3, 4, 5, 6, 7, 7, 7, 8, 9, 10];
        this.cliente = cliente; // Asignar cliente
    }

    // Método para verificar si el valor ingresado es parte de una combinación ganadora
    juegoGanador(): boolean {
        const apuesta = this.realizarApuesta();
        
        if (this.valor1 === apuesta && this.valor2 === apuesta && this.valor3 === apuesta) {
            console.log(`¡Has ganado! La combinación completa de ${apuesta} es ganadora.`);
            const ganancia = this.cliente.agregarSaldo(this.apuestaMinima * 2); // Agrega saldo al cliente
            console.log(`Tu saldo es ahora: ${this.cliente.getSaldo()}`);
            return true; 
        }

        // Comprobamos si al menos dos rodillos tienen el valor
        let contador = 0;
        if (this.valor1 === apuesta) contador++;
        if (this.valor2 === apuesta) contador++;
        if (this.valor3 === apuesta) contador++;

        // Si al menos dos rodillos tienen el valor, es victoria parcial
        if (contador >= 1) {
            console.log(`¡Has ganado parcialmente! El valor ${apuesta} aparece en ${contador} rodillo(s).`);
            this.cliente.apostar(this.apuestaMinima); // Descuenta la apuesta
            console.log(`Tu saldo es ahora: ${this.cliente.getSaldo()}`);
            return true; 
        }

        
        console.log(`Lo siento, el valor ${apuesta} no está en la combinación.`);
        this.cliente.apostar(this.apuestaMinima); // Descuenta la apuesta
        console.log(`Tu saldo es ahora: ${this.cliente.getSaldo()}`);
        return false;
    }


    iniciarJuego(): void {
        console.log(`Estás iniciando el juego ${this.getNombre()}`);
    }

    // Generar un resultado aleatorio
    generarResultado(): void {
        this.valor1 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
        this.valor2 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
        this.valor3 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
        console.log(`Combinación generada: ${this.valor1}, ${this.valor2}, ${this.valor3}`);
    }

    retirarse(): void {
        console.log("Te has retirado del juego. ¡Gracias por jugar!");
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


    realizarApuesta(): number {
        let apuesta = readlineSync.questionInt("Ingrese el número a apostar (1-10): ");
        if (apuesta >= 1 && apuesta <= 10) {
            console.log(`Apuesta aceptada: ${apuesta}`);
        } else {
            console.log("El número es inválido. Ingrese un número entre 1 y 10.");
            return this.realizarApuesta(); // Vuelve a pedir un número si es inválido
        }
        return apuesta;
    }


    mostrarSaldo(): void {
        console.log(`Saldo actual: ${this.cliente.getSaldo()}`);
    }


    multiplicador(): void {
        let multiplicador = Math.random() * 3 + 1;  // Multiplicador entre 1 y 4
        console.log(`Multiplicador: ${multiplicador}`);
    }


    instrucciones(): string {
        return "Bienvenido a Lucky Slot! Apuesta un número entre 1 y 10 y trata de obtener una combinación ganadora. ¡Buena suerte!";
    }
}