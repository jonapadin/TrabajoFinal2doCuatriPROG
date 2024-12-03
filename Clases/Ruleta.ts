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
    private coloresApostar: string [] = ["rojo","negro"];

    constructor(cliente?: Cliente) {
        super("Ruleta Smash", 250)
        this.cliente = cliente;
    }

    

    public girarRuleta(): number {
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
                let cantidadNumeros= readlineSync.questionInt("Ingrese cuantos numeros quiere apostar: ");

                for(let i = 0; i < cantidadNumeros; i ++){
                   this.numerosSeleccionados[i] = readlineSync.questionInt("Ingrese numero: ");
                   let cantidadApostar = readlineSync.questionInt("Seleccione Apuesta: ")
                   if(cantidadApostar >= this.apuestaMinima) {
                          if(this.numerosSeleccionados[i] < 0 || this.numerosSeleccionados[i] > 36) {
                           console.log("Numero invalido por favor ingrese un numero del 0 al 36, gracias!")
                           this.numerosSeleccionados[i] = readlineSync.questionInt("Ingrese numero: ");
                         }
                   } else {
                    console.log("Saldo insuficiente para realizar apuesta")
                    let cantidadApostar = readlineSync.questionInt("Seleccione Apuesta: ")
                   }
                
            }
            
            const resultadoRuleta = this.girarRuleta();
            for(let i = 0; i < this.numerosSeleccionados.length; i++){
                if(resultadoRuleta === this.numerosSeleccionados[i]){
                        console.log(`Fue tu jugada GANADORA! ${this.numerosSeleccionados[i]}`)

                }else {
                        console.log("PERDISTE :(")   
                }
                }
            break
       } 


      

    //    let seguirJugando = true; 

    //    while(seguirJugando){
    //        this.generarResultado();

    //        const seguir = readlineSync.keyInYN("Queres jugar de nuevo o Salir ? "); //apretar y o n para seguir
    //            if (!seguir){
    //                console.log ("Muchas gracias por Jugar con nosotros!"); 
    //                seguirJugando = false; 
    //            }
    //    }
    }

    generarResultado() {
        // const apuesta = this.realizarApuesta(); //llama a realizarApuesta, "ingrese un numero para apostar"
        // const resultadoRuleta = this.girarRuleta();
        
        // if (apuesta === resultadoRuleta) {
        //     console.log("Fue tu jugada GANADORA!")
        //     const ganancia = this.cliente?.agregarSaldo(this.apuestaMinima * 2) //agrego el saldo ganador 
        // } else {
        //     console.log("PERDISTE :(")
        //     const perdida = this.cliente?.apostar(this.apuestaMinima); //envio por parametro el valor de la apuesta minima para descontarle el valor de la jugada
        // }

        // return resultadoRuleta
    }

    retirarse(): void {}

    mostrarSaldo(): void {
        console.log(`Saldo actual: ${this.cliente?.getSaldo()}`);
    }

    multiplicador(): void {}

    leerInstrucciones(): void {
        try {
            const data = fs.readFileSync('ruleta.txt', 'utf-8');
    
            console.log(data)
    
        } catch (err) {
            console.error('Error al leer o parsear el archivo ruleta.txt:', err);
        }
    }

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

