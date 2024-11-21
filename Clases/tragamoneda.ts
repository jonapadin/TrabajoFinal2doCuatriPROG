import { JuegoSlot } from "./juegoSlot";

class Tragamoneda extends JuegoSlot {
    private rodillos: number;
    private lineaDePago: number;
    valor1: number;
    valor2: number;
    valor3: number;
    constructor(nombre: string, rodillos: number, lineaDePago: number, valor1: number, valor2: number, valor3: number) {
        super(nombre)
        this.rodillos = rodillos
        this.lineaDePago = lineaDePago;
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.valor3 = valor3;

    }

    public combinacionGanadora(){}
}