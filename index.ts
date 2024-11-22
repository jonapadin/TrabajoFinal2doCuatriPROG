// import { Tragamonedas } from "./Clases/tragamoneda";

import { Ruleta } from "./Clases/Ruleta";
import { JuegoSlot } from "./Clases/JuegoSlot";
import { Jugar } from "./Interfaces/Jugar";

//   // Ejemplo de uso
//   const tragamonedas = new Tragamonedas(3, 1); // 3 rodillos, 1 línea de pago
//   tragamonedas.generarCombinacion();
//   tragamonedas.juegoGanador(7);  // Verificamos si el valor 7 está en la combina

const ruleta = new Ruleta();

ruleta.iniciarJuego()
ruleta.realizarApuesta();
ruleta.girarRuleta();
ruleta.generarResultado();
