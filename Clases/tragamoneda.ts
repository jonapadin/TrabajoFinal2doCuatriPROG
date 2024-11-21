
export class Tragamonedas {
    private rodillos: number;
    private lineaDePago: number;
    private valor1: number;
    private valor2: number;
    private valor3: number;
    private valoresPosibles: number[];
  
    constructor(rodillos: number, lineaDePago: number) {
      this.rodillos = rodillos;
      this.lineaDePago = lineaDePago;
      this.valor1 = 0;
      this.valor2 = 0;
      this.valor3 = 0;
      // números del 1 al 10, pero el valor 7 tiene más probabilidades de salir
      this.valoresPosibles = [1, 2, 3, 4, 5, 6, 7, 7, 7, 8, 9, 10];
    }
  
    // Método para generar una combinación aleatoria de los rodillos
    generarCombinacion() {
      this.valor1 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
      this.valor2 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
      this.valor3 = this.valoresPosibles[Math.floor(Math.random() * this.valoresPosibles.length)];
  
      console.log(`Combinación generada: ${this.valor1}, ${this.valor2}, ${this.valor3}`);
    }
  
    // Método para verificar si el valor ingresado es parte de una combinación ganadora
    juegoGanador(valor: number): boolean {
      // Si todos los rodillos tienen el mismo valor, es victoria total
      if (this.valor1 === valor && this.valor2 === valor && this.valor3 === valor) {
        console.log(`¡Has ganado! La combinación completa de ${valor} es ganadora.`);
        return true; // Victoria total
      }
  
      // Comprobamos si al menos dos rodillos tienen el valor
      let contador = 0;
      if (this.valor1 === valor) contador++;
      if (this.valor2 === valor) contador++;
      if (this.valor3 === valor) contador++;
  
      // Si al menos dos rodillos tienen el valor, es victoria parcial
      if (contador >= 1) {
        console.log(`¡Has ganado parcialmente! El valor ${valor} aparece en ${contador} rodillo(s).`);
        return true; // Victoria parcial
      }
      
      if (contador >= 2) {
        console.log(`¡Has ganado parcialmente! El valor ${valor} aparece en ${contador} rodillo(s).`);
        return true; // Victoria parcial
      }
  
      // Si no hay coincidencias suficientes
      console.log(`Lo siento, el valor ${valor} no está en la combinación.`);
      return false; // No hubo coincidencias suficientes
    }
  }
  