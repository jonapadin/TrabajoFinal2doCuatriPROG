

//   // Ejemplo de uso
//   const tragamonedas = new Tragamonedas(3, 1); // 3 rodillos, 1 línea de pago
//   tragamonedas.generarCombinacion();
//   tragamonedas.juegoGanador(7);  // Verificamos si el valor 7 está en la combina


import { Casino } from "./Clases/Casino";
import { Cliente } from "./Clases/Cliente";
import { TragamonedaFruit } from "./Clases/TragamonedaV2";


const casino1 = new Casino;

const cliente1 = new Cliente("Jorge",53,1000);
const cliente2 = new Cliente ("Mauri",17,1000); 

//const ruleta = new Ruleta(cliente1);
const tragamoneda = new TragamonedaFruit(50,cliente1);
tragamoneda.jugar()
//const dado = new Dado (cliente1); 

casino1.agregarCliente(cliente1);
casino1.agregarCliente(cliente2); 
//casino1.agregarJuegos(ruleta); 
casino1.agregarJuegos(tragamoneda); 
//casino1.agregarJuegos(dado); 

casino1.menu(cliente1); 


