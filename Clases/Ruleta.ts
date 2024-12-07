import { Maquina } from "./Maquina";
import * as readlineSync from 'readline-sync'
import { Cliente } from "./Cliente";
import * as fs from 'fs';

export class Ruleta extends Maquina {
    private bola: number = 0;
    private numerosRojos: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    private numerosNegros: number[] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 31, 33, 35];
    private numeroVerde: number = 0;
    private cliente?:Cliente;
    private numerosSeleccionados:number [] = [];
    private montosApostados: number[] = [];

    constructor(cliente?: Cliente) {
        super("🎡Ruleta Smash", 250)
        this.cliente = cliente;
    }

    //mensaje de que se esta iniciando el juego para luego apostar
    public iniciarJuego(): void {
        console.log(`⏳¡Espere por favor, se esta iniciando el juego ${this.nombre}!⌛`)
    }

    public jugar(): void {
       if(this.cliente?.getSaldo() == 0) {
        console.log("❌ Saldo insuficiente")
        return
       }
       this.mostrarSaldo();

       console.log("1- 🔢 Seleccionar numeros");
       console.log("2- 🎨 Apuesta por Color");
       console.log("3- 🕹️  Par o impar");
       
       let opcion:number = readlineSync.questionInt("Seleccione Apuesta: ")
       switch(opcion) {
            case 1:
                console.log("La apuesta mínima es de: ", this.apuestaMinima);
                let cantidadNumeros: number;
                do {
                    cantidadNumeros = readlineSync.questionInt("Ingrese cuántos números quiere apostar (entre 1 y 36): ");
                } while (cantidadNumeros < 1 || cantidadNumeros > 36);
                
                if (this.cliente && this.cliente.getSaldo() > 0) {
                    let montoTotalApostar: number = 0;
                
                    for (let i = 0; i < cantidadNumeros; i++) {
                        let numeroSeleccionado: number;
                        do {
                            numeroSeleccionado = readlineSync.questionInt("Ingrese el número al que quiere apostar (entre 0 y 36): ");
                        } while (numeroSeleccionado < 0 || numeroSeleccionado > 36);
                
                        let cantidadApostar: number;
                        do {
                            cantidadApostar = readlineSync.questionInt(`Ingrese el monto a apostar al número ${numeroSeleccionado}: `);
                            if (cantidadApostar < this.apuestaMinima) {
                                console.log("❌ La apuesta es menor que la apuesta mínima.");
                            }
                        } while (cantidadApostar < this.apuestaMinima);
                
                        if (cantidadApostar > this.cliente.getSaldo()) {
                            console.log("❌ Saldo insuficiente para realizar esta apuesta.");
                            break;  
                        }
                
                        this.numerosSeleccionados[i] = numeroSeleccionado;
                        this.montosApostados[i] = cantidadApostar;
                        montoTotalApostar += cantidadApostar;
                
                        console.log(`💰 Apostaste ${cantidadApostar} al número ${numeroSeleccionado}`);
                    }
                
                    if (montoTotalApostar <= this.cliente.getSaldo()) {
                        const resultadoRuleta: number = this.generarResultado();
                        console.log(`🎡 El resultado de la ruleta es: ${resultadoRuleta}`);
                

                        let gano: boolean = false;
                        for (let i = 0; i < this.numerosSeleccionados.length; i++) {
                            if (resultadoRuleta === this.numerosSeleccionados[i]) {
                                console.log(`🎉 ¡Tu jugada fue GANADORA! El número ${this.numerosSeleccionados[i]} salió en la ruleta.`);
                                gano = true;
                                this.jugar(); 
                            }
                        }

                        if (!gano) {
                            console.log("😒 ¡PERDISTE!");
                            this.cliente.setSaldo(this.cliente.getSaldo() - montoTotalApostar);
                        }
                    } else {
                        console.log("❌ Saldo insuficiente para realizar la apuesta total.");
                    }
                } else {
                    console.log("❌ No tienes saldo suficiente para hacer una apuesta.");
                }
                
                
            break
            case 2:
                if(this.cliente) {
                    let respuesta:string = readlineSync.question("Elige un color a apostar (ROJO/NEGRO): ").toUpperCase();
                    console.log("💰La apuesta minima es de: ", this.apuestaMinima);
                    let apuesta:number = readlineSync.questionInt("Ingrese monto de apuesta que desee: ");
                    if (apuesta >= this.apuestaMinima && apuesta <= this.cliente.getSaldo()) {

                       while(respuesta != "NEGRO" && respuesta != "ROJO" ) {
                        console.log("❌ Opcion no valida debe seleccionar rojo o negro")

                        respuesta = readlineSync.question("Elige un color a apostar(ROJO/NEGRO): ").toUpperCase();
                       }
                       const resultadoRuleta:number = this.generarResultado();

                       if(resultadoRuleta == 0 ) {
                        console.log("😥!Perdiste la bola ha caido en el 0! 🟩");
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        console.log("💰Saldo actual: ", this.cliente.getSaldo());
                        this.jugar();
                       } 
                       if(respuesta == "ROJO") {
                        this.numerosSeleccionados.push(resultadoRuleta);
                        this.numerosSeleccionados = this.numerosRojos;
                        console.log("El color ganador es ROJO! 🟥");
                        this.cliente.setSaldo(this.cliente.getSaldo() + apuesta); 
                        console.log("💰Saldo actual: ", this.cliente.getSaldo());
                        this.jugar()
                       } else {
                        console.log(`😥Perdiste el color que seleccionaste es ${respuesta}`)
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        this.jugar();
                       }

                       if(respuesta == "NEGRO") {
                        this.numerosSeleccionados.push(resultadoRuleta);
                        this.numerosSeleccionados = this.numerosNegros;
                        console.log("El color ganador es NEGRO! ⬛");
                        this.cliente.setSaldo(this.cliente.getSaldo() + apuesta); 
                        console.log("Saldo actual: ", this.cliente.getSaldo());
                       }else {
                        console.log(`😥 !Perdiste el color que seleccionaste es ${respuesta}`)
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        this.jugar();
                       }                        
                    }
                }            
            break
            case 3:     
            if(this.cliente) {
                let respuesta:string = readlineSync.question("Ingrese si desea apostar PAR/IMPAR: ").toUpperCase()
                console.log("La apuesta minima es de: ", this.apuestaMinima)
                let apuesta:number = readlineSync.questionInt("Ingrese monto de apuesta que desee: ");
                if (apuesta >= this.apuestaMinima && apuesta <= this.cliente.getSaldo()) {


                    while(respuesta != "PAR" && respuesta != "IMPAR" ) {
                        console.log("❌ Opcion no valida debe seleccionar par o impar")

                        respuesta = readlineSync.question("Elige un valor a apostar (PAR/IMPAR): ").toUpperCase();
                    }

                    const resultadoRuleta:number = this.generarResultado();

                    if(resultadoRuleta == 0 ) {
                        console.log("😥 !Perdiste la bola ha caido en el 0");
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        console.log("💰 Saldo actual: ", this.cliente.getSaldo());
                        this.jugar();
                    } 

                     if (resultadoRuleta % 2 == 0 && respuesta == "PAR") {
                        console.log("🎉 El numero ganador es PAR!");
                        this.cliente.setSaldo(this.cliente.getSaldo() + apuesta); 
                        console.log("💰 Saldo actual: ", this.cliente.getSaldo());

                    } else {
                        console.log(`😥 !Perdiste el numero que seleccionaste no es ${respuesta}`)
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        this.jugar();
                    }

                    if (resultadoRuleta % 2 != 0 && respuesta == "IMPAR") {
                        console.log("🎉 El numero ganador es IMPAR!");
                        this.cliente.setSaldo(this.cliente.getSaldo() + apuesta);
                        console.log("💰 Saldo actual: ", this.cliente.getSaldo());

                    }  else {
                        console.log(`😥 !Perdiste el color que seleccionaste no es ${respuesta}`)
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        this.jugar();
                    }
                }               
                break
       } 
    } 
    } 
      
    public generarResultado():number {
        this.bola = Math.floor(Math.random() * 37);

        if (this.bola == this.numeroVerde) {
            console.log("La bola ha caído en el número (0)🟩.");
        } else if (this.numerosRojos.includes(this.bola)) {
            console.log(`La bola ha caído en ${this.bola} 🟥.`);
        } else if (this.numerosNegros.includes(this.bola)) {
            console.log(`La bola ha caído en ${this.bola} ⬛.`);
        }
        return this.bola
    }    

    public mostrarSaldo(): void {
        console.log(`Saldo actual: ${this.cliente?.getSaldo()}`);
    }
 
    public  realizarApuesta(): number {
        let apuesta:number = readlineSync.questionInt("Ingrese el numero a apostar:  ")
        if (apuesta >= 0 && apuesta <= 36) {
            console.log(apuesta)
        } else {
            console.log("❌ El numero es invalido. Ingrese un numero entre 0 y 36")
            console.log("__________________________________________")
            return this.realizarApuesta(); //vuelve a pedir un numero para apostar
        }
        return apuesta;
    }
}