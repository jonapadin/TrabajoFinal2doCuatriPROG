import { JuegoSlot } from "./JuegoSlot";


class Ruleta extends JuegoSlot {
    private numeros: number;
    private rojo: string;
    private negro: string;

    constructor(nombre: string, numeros: number, rojo: string, negro: string) {
        super(nombre);
        this.numeros = numeros;
        this.rojo = rojo;
        this.negro = negro;

    }
}