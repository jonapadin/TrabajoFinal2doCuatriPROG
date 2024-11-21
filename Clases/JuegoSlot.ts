export class JuegoSlot{
    protected nombre:string;
    protected apuestaMinima:number;

    constructor(nombre:string){
        this.nombre = nombre
    }
    public iniciarJuego():void{}
    public realizarApuesta():void{}
    public mostrarSaldo():void{}
    //ver el de numero aleatorio.
    public multiplicador():void{}
    public instrucciones():void{}
    public gano():void{}
    public validarSaldo(saldo:number):number{
        return saldo
    }
}