import { JuegoSlot } from "./juegoSlot";

class Dado extends JuegoSlot{
    private valorDado:number;
    constructor (nombre:string,valorDado:number){
        super(nombre)
        this.valorDado = valorDado
    }

    public combinacionGanadora(){
        
    }
}