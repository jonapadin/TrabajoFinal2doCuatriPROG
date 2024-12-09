export class Cliente {
    private nombre: string;
    private edad: number;
    private dni: string;
    private saldo: number;

    constructor(nombre: string, edad: number, dni: string, saldo?: number) {
        this.nombre = nombre;
        this.edad = edad;
        this.dni = dni;
        this.saldo = saldo ?? 0;
    }

    public getNombre(): string {
        return this.nombre
    }
    public getEdad(): number {
        return this.edad
    }

    public getDni(): string {
        return this.dni
    }

    public getSaldo(): number {
        return this.saldo
    }

    public setSaldo(saldo: number): void {
        this.saldo = saldo;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setEdad(edad: number): void {
        this.edad = edad;
    }

    public agregarSaldo(saldo: number): void {
        if (saldo <= 0) {
            console.log("❌ El monto para agregar debe ser mayor a cero.");
            return;
        } else {
            this.setSaldo(this.getSaldo() + saldo);
            console.log(`✔ Se agregó un saldo de ${saldo}. Saldo actual: $ ${this.getSaldo()}`);
        }

    }

    public apostar(monto: number): boolean {
        if (monto <= 0) {
            console.log("❌ ¡El monto de la apuesta debe ser mayor a cero.!");
            return false;
        }
        if (this.getSaldo() < monto) {
            console.log("❌ ¡No tienes suficiente saldo para realizar esta apuesta.!");
            return false;
        }

        this.setSaldo(this.getSaldo() - monto);
        console.log(`💰 ¡Apuesta de ${monto} realizada. Saldo restante: $ ${this.getSaldo()}!`);
        return true;
    }
}