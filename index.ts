import { Tragamonedas } from "./Clases/tragamoneda";


  // Ejemplo de uso
  const tragamonedas = new Tragamonedas(3, 1); // 3 rodillos, 1 línea de pago
  tragamonedas.generarCombinacion();
  tragamonedas.juegoGanador(7);  // Verificamos si el valor 7 está en la combina