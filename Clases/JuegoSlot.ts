

export abstract class JuegoSlot implements Jugar{
    protected nombre:string;
    protected apuestaMinima:number;

    constructor(nombre:string, apuestaMinima:number){
        this.nombre = nombre;
        this.apuestaMinima = apuestaMinima;
    }

    public getNombre(): string{
        return this.nombre; 
    }

    public setNombre(nombre:string):void{
        this.nombre= nombre;
    }

    public getApuestaMinima():number{
        return this.apuestaMinima; 
    }

    public setApuestaMinima(apuestaMinima:number):void{
        this.apuestaMinima= apuestaMinima; 
    }

    //METODOS DE LA INTERFACE JUGAR
    abstract iniciarJuego():void;
    abstract obtenerJugada(): number;
    abstract retirarse():void;
    abstract jugar():void
    
    abstract realizarApuesta():void;
    abstract mostrarSaldo():void;
    abstract numeroAleatorio(): void;
    abstract multiplicador():void;
    abstract instrucciones():void;
    abstract gano():void;

  
    public validarSaldo(saldo:number):number{
        return saldo
    }
}