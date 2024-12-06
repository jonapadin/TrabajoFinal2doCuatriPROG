import { Cliente } from "./Cliente";
import { Maquina } from "./Maquina";

export abstract class Tragamoneda extends Maquina {

    private apuesta: number;
    protected cliente? : Cliente;
    
    constructor(nombre: string, apuestaMinima: number, cliente?:Cliente) {
        super(nombre, apuestaMinima);
        this.apuesta = 0;
        this.cliente = cliente;
    }

    

    iniciarJuego(): void {
        console.log("Iniciando el juego de tragamonedas: " + this.nombre);
    }



    generarResultado(): void {

        console.log("Generando el resultado...");
    }
 
     

    jugar(): void {

        if(this.cliente) {
            if (this.cliente?.getSaldo() < this.apuestaMinima) {
                console.log("Saldo insuficiente para jugar.");
                return;
            }
        }
    }


    realizarApuesta(): number {
        console.log("Realizando apuesta...");
        this.apuesta = this.apuestaMinima;  
        return this.apuesta;
    }

    mostrarSaldo(): void {
        console.log("Saldo actual: " + this.cliente?.getSaldo());
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