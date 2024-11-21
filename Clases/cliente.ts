export class Cliente {
    private nombre: string;
    private edad: number;
    private saldo: number;

    constructor(nombre: string, edad: number, saldo: number) {
        this.nombre = nombre;
        this.edad = edad;
        this.saldo = saldo;

    }

    getNombre() {
        return this.nombre
    }
    getedad() {
        return this.edad
    }
    getSaldo() {
        return this.saldo
    }
    setNombre(nombre: string) {
        this.nombre = nombre;
    }
    setEdad(edad: number) {
        this.edad = edad;
    }
    agregarSaldo() {
        let saldo = this.getSaldo()
        if (saldo <= 0) {
            console.log("No tienes saldo para ir a jugar al bingo")

        }
    }
}