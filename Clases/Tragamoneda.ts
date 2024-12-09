import { Cliente } from "./Cliente";
import { Maquina } from "./Maquina";

export abstract class Tragamoneda extends Maquina {
    private apuesta: number;
    protected cliente?: Cliente;

    constructor(nombre: string, apuestaMinima: number, cliente?: Cliente) {
        super(nombre, apuestaMinima);
        this.apuesta = 0;
        this.cliente = cliente;
    }

    public iniciarJuego(): void {
        console.log("⏳¡Iniciando el juego de tragamonedas: " + this.nombre! + "⌛");
    }

    public generarResultado(): void {

        console.log("🎰 Generando el resultado...");
    }

    public jugar(): void {

        if (this.cliente) {
            if (this.cliente?.getSaldo() < this.apuestaMinima) {
                console.log("❌ Saldo insuficiente para jugar.");
                return;
            }
        }
    }

    public realizarApuesta(): number {
        console.log("💰 Realizando apuesta...");
        this.apuesta = this.apuestaMinima;
        return this.apuesta;
    }

    public mostrarSaldo(): void {
        console.log("💰 Saldo actual: " + this.cliente?.getSaldo());
    }

    public validarSaldo(saldo: number): number {
        if (saldo < this.apuestaMinima) {
            console.log("❌ Saldo insuficiente.");
            return 0;
        }
        return saldo;
    }
}