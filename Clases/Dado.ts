import { JuegoSlot } from "./JuegoSlot";

class Dado extends JuegoSlot{
    private valorDado:number;
    constructor (nombre:string,valorDado:number){
        super(nombre)
        this.valorDado = valorDado
    }

    public combinacionGanadora(){
        
    }
}