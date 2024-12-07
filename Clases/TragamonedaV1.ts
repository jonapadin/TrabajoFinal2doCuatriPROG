import { Cliente } from './Cliente';
import * as readlineSync from 'readline-sync';
import { Tragamoneda } from './Tragamoneda';

export class TragamonedaLucky extends Tragamoneda {
    private valor1: number;
    private valor2: number;
    private valor3: number;
    private valoresPosibles: number[];

    constructor(cliente?: Cliente) {
        super("🎰Lucky Slot", 100); // Nombre del juego y apuesta mínima
        this.valor1 = 0;
        this.valor2 = 0;
        this.valor3 = 0;
        // Números del 1 al 10, pero el valor 7 tiene más probabilidades de salir
        this.valoresPosibles = [1, 2, 3, 4, 5, 6, 7, 7, 7, 8, 9, 10];
        this.cliente = cliente;
    }

    public iniciarJuego(): void {
        console.log(`⏳¡Estás iniciando el juego ${this.getNombre()}!⌛`);
    }

    public realizarApuesta(): number {
        let apuesta:number = readlineSync.questionInt("Ingrese el número a apostar (1-10): ");
        if (apuesta >= 1 && apuesta <= 10) {
            console.log(`✔ Apuesta aceptada: ${apuesta}`);
        } else {
            console.log("❌ El numero es inválido. Ingrese un numero entre 1 y 10.");
            return this.realizarApuesta(); // Vuelve a pedir un número si es inválido
        }
        return apuesta;
    }

    // Generar un resultado aleatorio
    public generarResultado(): void {
        if( this.valoresPosibles.length == 0) {
            console.error("❌ Maquina fuera de servicio!");
            return;
        }

        this.valor1 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
        this.valor2 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
        this.valor3 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
         console.log(`🎰 Combinación generada: ${this.valor1}, ${this.valor2}, ${this.valor3}`);
    }

    // Método para verificar si el valor ingresado es parte de una combinación ganadora
    public juegoGanador(): boolean {
        const apuesta:number = this.realizarApuesta();
        
        if (this.valor1 == apuesta && this.valor2 == apuesta && this.valor3 == apuesta) {
            console.log(`🎉¡Has ganado! La combinación completa de ${apuesta} es ganadora.`);
            this.cliente?.agregarSaldo(this.apuestaMinima * 2); // Agrega saldo al cliente
            return true; 
        }
        // Comprobamos si al menos dos rodillos tienen el valor
        let contador:number = 0;
        if (this.valor1 == apuesta) contador++;
        if (this.valor2 == apuesta) contador++;
        if (this.valor3 == apuesta) contador++;

        // Si al menos dos rodillos tienen el valor, es victoria parcial
        if (contador >= 1) {
            console.log(`🎉¡Has ganado parcialmente! El valor ${apuesta} aparece en ${contador} rodillo(s).`);
            this.cliente?.apostar(this.apuestaMinima); // Descuenta la apuesta
            return true; 
        }   
        console.log(`😥 Lo siento, el valor ${apuesta} no está en la combinación.`);
        if(this.cliente) {
            this.cliente?.apostar(this.apuestaMinima); // Descuenta la apuesta
            return true;
        }  else {
            console.log("❌ No existe el cliente")
            return false
        }
    }

    public jugar(): void {
        if(this.cliente) {


                console.clear();
                this.iniciarJuego();
                this.generarResultado();
                this.juegoGanador();
                this.mostrarSaldo();
    
                let seguirJugando:boolean = true;
                let pregunta:string = readlineSync.question("Deseas seguir jugando?: ").toLowerCase();
                if(pregunta == "si") {
                    this.generarResultado();
                    this.juegoGanador();
                    this.mostrarSaldo();
                } else if(pregunta == "no") {
                    seguirJugando = false;
                }
        }

    }

    public mostrarSaldo(): void {
    if (this.cliente) {
        console.log(`💰 Tu saldo es: ${this.cliente.getSaldo()}`);
    } else {
        console.log("❌ No hay un cliente asociado.");
    }
    }
}