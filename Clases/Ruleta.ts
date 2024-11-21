import { JuegoSlot } from "./JuegoSlot";
import { questionInt} from 'readline-sync';


export class Ruleta extends JuegoSlot {
    private bola: number = 0;
    private numerosRojos: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    private numerosNegros: number[] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 31, 33, 35];
    private numeroVerde: number = 0; 

constructor(){
    super("Ruleta Smash")
}





public girarRuleta(){
    this.bola = Math.floor(Math.random() * 37);

    if (this.bola === this.numeroVerde) {
        console.log("La bola ha caído en el número verde (0).");
    } else if (this.numerosRojos.includes(this.bola)) {
        console.log(`La bola ha caído en ${this.bola} rojo.`);
    } else if (this.numerosNegros.includes(this.bola)) {
        console.log(`La bola ha caído en ${this.bola} negro.`);
    } 
}
  
}