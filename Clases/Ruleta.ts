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


    constructor(cliente?: Cliente) {
        super("Ruleta Smash", 250)
        this.cliente = cliente;
    }

    


    //mensaje de que se esta iniciando el juego para luego apostar
    iniciarJuego(): void {
        console.log(`Espere por favor, se esta iniciando el juego ${this.nombre}`)
    }

    jugar(): void {
       if(this.cliente?.getSaldo() === 0) {
        console.log("Saldo insuficiente")
        return
       }
       this.mostrarSaldo();


       console.log("1- Seleccionar numeros");
       console.log("2- Apuesta por Color");
       console.log("3- Par o impar");
       
       let opcion = readlineSync.questionInt("Seleccione Apuesta: ")
       switch(opcion) {
            case 1:
                console.log("La apuesta mínima es de: ", this.apuestaMinima);
                let cantidadNumeros: number = readlineSync.questionInt("Ingrese cuántos números quiere apostar: ");
                let comparador: number = cantidadNumeros * this.apuestaMinima; 
                let cantidadApostar: number = readlineSync.questionInt("Seleccione la cantidad a apostar: ");
                
                if (this.cliente && comparador <= this.cliente.getSaldo()) { // Verificar que el saldo sea suficiente
                    for (let i = 0; i < cantidadNumeros; i++) {

                        this.numerosSeleccionados[i] = readlineSync.questionInt("Ingrese número: ");
                        
                        // Validar que el número esté entre 0 y 36
                        while (this.numerosSeleccionados[i] < 0 || this.numerosSeleccionados[i] > 36) {
                            console.log("Número inválido. Por favor ingrese un número del 0 al 36.");
                            this.numerosSeleccionados[i] = readlineSync.questionInt("Ingrese número: ");
                        }
                
                   
                

                        if (cantidadApostar >= this.apuestaMinima) {
                            console.log(`Apostaste ${cantidadApostar} al número ${this.numerosSeleccionados[i]}`);
                        } else {
                            console.log("La apuesta es menor que la apuesta mínima.");
                            this.jugar(); 
                        }
                    }
                

                    const resultadoRuleta = this.generarResultado();
                    console.log(`El resultado de la ruleta es: ${resultadoRuleta}`);
                
                    // Verificar si el cliente ganó
                    let gano = false;
                    for (let i = 0; i < this.numerosSeleccionados.length; i++) {
                        if (resultadoRuleta === this.numerosSeleccionados[i]) {
                            console.log(`¡Tu jugada fue GANADORA! El número ${this.numerosSeleccionados[i]} salió en la ruleta.`);
                            gano = true;
                            this.jugar();
                        }
                    }
                
                    // Si no hay coincidencia, el cliente perdió
                    if (!gano) {
                        console.log("PERDISTE!");

                        this.cliente.setSaldo(this.cliente.getSaldo() - cantidadApostar);
                    }
                } else {
                    console.log("Saldo insuficiente para realizar la apuesta total.");
                }
            
            break
            case 2:
                if(this.cliente) {
                    let respuesta = readlineSync.question("Elige un color a apostar ROJO/NEGRO: ").toUpperCase();
                    console.log("La apuesta minima es de: ", this.apuestaMinima);
                    let apuesta = readlineSync.questionInt("Ingrese monto de apuesta que desee: ");
                    if (apuesta >= this.apuestaMinima && apuesta <= this.cliente.getSaldo()) {

                       while(respuesta !== "NEGRO" && respuesta !== "ROJO" ) {
                        console.log("Opcion no valida debe seleccionar rojo o negro")

                        respuesta = readlineSync.question("Elige un color a apostar ROJO/NEGRO: ").toUpperCase();
                       }

                       const resultadoRuleta = this.generarResultado();

                       if(resultadoRuleta === 0 ) {
                        console.log("Perdiste la bola ha caido en el 0");
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        console.log("Saldo actual: ", this.cliente.getSaldo());
                        this.jugar();
                       } 
                       if(respuesta === "ROJO") {
                        this.numerosSeleccionados.push(resultadoRuleta);
                        this.numerosSeleccionados = this.numerosRojos;
                        console.log("El color ganador es ROJO!");
                        this.cliente.setSaldo(this.cliente.getSaldo() + apuesta); 
                        console.log("Saldo actual: ", this.cliente.getSaldo());
                        this.jugar()
                       } else {
                        console.log(`Perdiste el color que seleccionaste es ${respuesta}`)
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        this.jugar();
                       }

                       if(respuesta === "NEGRO") {
                        this.numerosSeleccionados.push(resultadoRuleta);
                        this.numerosSeleccionados = this.numerosNegros;
                        console.log("El color ganador es NEGRO!");
                        this.cliente.setSaldo(this.cliente.getSaldo() + apuesta); 
                        console.log("Saldo actual: ", this.cliente.getSaldo());
                       }else {
                        console.log(`Perdiste el color que seleccionaste es ${respuesta}`)
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        this.jugar();
                       }
                       
                    
                    }
                }
                
            break
            case 3:     
            if(this.cliente) {
                let respuesta = readlineSync.question("Ingrese si desea apostar PAR/IMPAR: ").toUpperCase()
                console.log("La apuesta minima es de: ", this.apuestaMinima)
                let apuesta = readlineSync.questionInt("Ingrese monto de apuesta que desee: ");
                if (apuesta >= this.apuestaMinima && apuesta <= this.cliente.getSaldo()) {


                    while(respuesta !== "PAR" && respuesta !== "IMPAR" ) {
                        console.log("Opcion no valida debe seleccionar par o impar")

                        respuesta = readlineSync.question("Elige un color a apostar PAR/IMPAR: ").toUpperCase();
                    }


                    const resultadoRuleta = this.generarResultado();

                    if(resultadoRuleta === 0 ) {
                        console.log("Perdiste la bola ha caido en el 0");
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        console.log("Saldo actual: ", this.cliente.getSaldo());
                        this.jugar();
                    } 


                     if (resultadoRuleta % 2 === 0 && respuesta === "PAR") {
                        console.log("El numero ganador es PAR!");
                        this.cliente.setSaldo(this.cliente.getSaldo() + apuesta); 
                        console.log("Saldo actual: ", this.cliente.getSaldo());

                    } else {
                        console.log(`Perdiste el numero que seleccionaste no es ${respuesta}`)
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        this.jugar();
                    }

                    if (resultadoRuleta % 2 !== 0 && respuesta === "IMPAR") {
                        console.log("El numero ganador es IMPAR!");
                        this.cliente.setSaldo(this.cliente.getSaldo() + apuesta);
                        console.log("Saldo actual: ", this.cliente.getSaldo());

                    }  else {
                        console.log(`Perdiste el color que seleccionaste no es ${respuesta}`)
                        this.cliente.setSaldo(this.cliente.getSaldo() - apuesta);
                        this.jugar();
                    }

                }               
                break
       } 

    } 
    } 
      



    generarResultado() {
        this.bola = Math.floor(Math.random() * 2);

        if (this.bola === this.numeroVerde) {
            console.log("La bola ha caído en el número verde (0).");
        } else if (this.numerosRojos.includes(this.bola)) {
            console.log(`La bola ha caído en ${this.bola} rojo.`);
        } else if (this.numerosNegros.includes(this.bola)) {
            console.log(`La bola ha caído en ${this.bola} negro.`);
        }
        return this.bola
    }

     

    mostrarSaldo(): void {
        console.log(`Saldo actual: ${this.cliente?.getSaldo()}`);
    }

    multiplicador(): void {}


    realizarApuesta(): number {
        let apuesta = readlineSync.questionInt("Ingrese el numero a apostar:  ")
        if (apuesta >= 0 && apuesta <= 36) {
            console.log(apuesta)
        } else {
            console.log("El numero es invalido. Ingrese un numero entre 0 y 36")
            console.log("________________________")
            return this.realizarApuesta(); //vuelve a pedir un numero para apostar
        }
        return apuesta;
    }
}