import * as readlineSync from 'readline-sync'

export class Cliente {
    
    private nombre: string;
    private edad: number;
    private saldo: number;
    
    constructor(nombre: string, edad: number, saldo: number) {
        this.nombre = nombre;
        this.edad = edad;
        this.saldo = saldo;
    }

    getNombre():string {
        return this.nombre
    }
    getedad():number {
        return this.edad
    }

    getSaldo(): number {
        return this.saldo
    }

    setSaldo(saldo:number): void{ //agrego este metodo para usar en "agregar saldo" y "apostar"
        this.saldo = saldo; 
    }

    setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    setEdad(edad: number): void {
        this.edad = edad;
    }

   
    //Quizas en casino?
    agregarSaldo(saldo: number): void {
        if (saldo <= 0) {
            console.log("El monto para agregar debe ser mayor a cero.");
            return;
        }else{
            this.setSaldo(this.getSaldo()+saldo); // uso setSaldo y le envio getSaldo+saldo 
            console.log(`Se agregó un saldo de ${saldo}. Saldo actual: $ ${this.getSaldo()}`);
        }
       
    }

    apostar(monto: number): boolean {
        if (monto <= 0) {
            console.log("El monto de la apuesta debe ser mayor a cero.");
            return false;
        }
        if (this.getSaldo() < monto) {
            console.log("No tienes suficiente saldo para realizar esta apuesta.");
            return false;
        }
        
        this.setSaldo(this.getSaldo()-monto); //le descuento el valor de la jugada al saldo
        console.log(`Apuesta de ${monto} realizada. Saldo restante: $ ${this.getSaldo()}`);
        return true;
    }
}