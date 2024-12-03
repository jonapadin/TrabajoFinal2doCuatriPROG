import { Jugar } from "../Interfaces/Jugar";

export abstract class Maquina implements Jugar{
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
    abstract generarResultado(): void;
    abstract retirarse():void;
    abstract jugar():void
    
    abstract realizarApuesta():number;
    abstract mostrarSaldo():void;
    // abstract numeroAleatorio(): void;
    abstract multiplicador():void;
    abstract leerInstrucciones():void;
    // abstract montoApuesta():number;//se agrega este metodo para comparar el saldo dle cliente con el que aposto en la maquina


  
    public validarSaldo(saldo:number):number{
        return saldo
    }
}