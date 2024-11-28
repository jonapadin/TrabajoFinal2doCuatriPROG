import { Casino } from "./Clases/Casino"
import * as readlineSync from 'readline-sync';
import { Cliente } from "./Clases/Cliente";
import * as fs from 'fs';
import { resolve } from "path";
import { readFile } from "fs/promises";

let casino = new Casino
export function menuPrincipal() {
    console.log("**********************************************************")
    console.log(`Bienvenido al CASINO ! ${casino.getNombre()} `)
    console.log("**********************************************************")
    console.log("1- Registrarse")
    console.log("2- Iniciar Sesion")
    console.log("0- Salir")
    let opcion = readlineSync.question("elija una opcion:")
    
    switch(opcion) {
        case "1": 
        menuRegistro();
        break;
        case "2":
            menuIniciarSesion();
        break;
        case "0": 
        return
        default:
            console.log("Operacion no valida")
            menuPrincipal();
    }


}

function menuRegistro() {
    let nombreUsuario = readlineSync.question("Ingrese Nombre: ")
    let edad = readlineSync.questionInt("Ingrese su Edad: ")
    let dni = readlineSync.question("Ingrese su DNI: ")
    validacionCampo(nombreUsuario, edad, dni)
    registrarCliente(nombreUsuario,edad,dni);

}
function menuIniciarSesion() { 
    let dniUsuario = readlineSync.question("Ingrese su DNI para iniciar sesion: ")
    seleccionarUsuario(dniUsuario);
 }

function validacionCampo(nombreUsuario: string, edad: number, dni: string) {
    if (nombreUsuario === "") {
        console.log("ingrese un nombre.")
        
    }
    if (nombreUsuario.length <= 3) {
        console.log("ingrese minimo 4 caracteres")
        return
    }
    if (edad < 18) {
        console.log("Usted no puede jugar, ya que es menor de 18 años")
        return
    }
  
}  

function registrarCliente(nombreUsuario:string,edad:number,dni:string){
    let cliente = new Cliente(nombreUsuario,edad,dni)
    casino.agregarCliente(cliente)
    console.log ("Cliente agregado con Exito")
    guardarEnArchivo("cliente.txt", casino.getCliente())
}

function guardarEnArchivo(nombreArchivo: string, datos: any[]): void {
    try {
        // Convertir los datos a formato JSON
        const contenido = JSON.stringify(datos, null, 2); // El "2" es para formatear el JSON con indentación para que sea legible


        fs.writeFileSync(nombreArchivo, contenido, 'utf8');
        console.log(`El archivo se guardó correctamente como ${nombreArchivo}`);
    } catch (err) {

        console.error("Hubo un error al guardar el archivo: ", err);
    }
}


function seleccionarUsuario(dni: string) {
    try {
        // Leer el archivo de manera sincrónica
        const data = fs.readFileSync('cliente.txt', 'utf-8');

        // Parsear los datos a JSON
        const clienteTxt: { nombre: string; edad: number; dni: string }[] = JSON.parse(data);

        // Mapear a instancias de Cliente
        const clientes: Cliente[] = clienteTxt.map(
            (cliente) => new Cliente(cliente.nombre, cliente.edad, cliente.dni)
        );

        // Buscar el cliente por DNI
        const cliente = clientes.find((v) => v.getDni() === dni);

        if (cliente) {
            console.log(`Bienvenido ${cliente.getNombre()} seras redirigido al casino!`);
            // Aquí puedes redirigir al menú principal del casino para clientes registrados
        menu(cliente); // Asegúrate de tener implementado este método en Casino
            
        } else {
            console.log("No existe un usuario con ese DNI.");
        }
        
    } catch (err) {
        console.error("Hubo un error al leer el archivo:", err);
    }
}


function menu(cliente:Cliente): void{

    console.log("******************************************************************************"); 
    console.log (`Bienvenido ${cliente.getNombre()} a el casino: ${casino.getNombre()} !. Tu saldo actual es de: ${cliente.getSaldo()}`); 
    console.log("******************************************************************************"); 

    console.log(`1. Agregar Saldo `);
    console.log(`2. Seleccionar juegos`);
    console.log(`3. Ver Instrucciones`);
    console.log(`4. Retirar dinero`);
    console.log(`5. Cerrar sesion`);

    console.log("-----------------------------------------------------------------"); 
    //Leer opcion del cliente
    const opcion = readlineSync.question("Elige una opcion: "); 

    switch(opcion){
        case "1":
        //Opcion de recarga
        const recargaSaldo = readlineSync.questionInt("Cuanto dinero desea ingresar a su cuenta?: "); 
        cliente.agregarSaldo(recargaSaldo);
            break
        case "2":
            elegirJuegos();
            break
        case "3":
            menuInstrucciones(cliente);
            break
        default: console.log("Eliga una opcion valida")
    }
    menu(cliente);
}

export function elegirJuegos(){
    console.log("Juegos")
}

export function menuInstrucciones(cliente:Cliente){
    console.log(`1. Instrucciones juego: Dado `);
    console.log(`2. Instrucciones juego: Ruleta`);
    console.log(`3. Instrucciones juegos: Tragamonedas`);
    console.log(`4. volver`);


    const opcion = readlineSync.question("Elige una opcion: "); 
    
    switch(opcion){
        case "1":
            leerInstruccionesDado();
        break;
        case "2":
            leerInstruccionesRuleta();
        break;
        case "3":
            leerInstruccionesTragamonedas();
           break;
         case "4": 
         menu(cliente) 
         break
         default:
            console.log("Operacion no valida")
          
    }
    menuInstrucciones(cliente);
}

export const leerInstruccionesDado = () => {
    try {
        // Leemos el archivo veterinarias.txt de forma síncrona
        const data = fs.readFileSync('dado.txt', 'utf-8');

        console.log(data)

    } catch (err) {
        console.error('Error al leer o parsear el archivo veterinarias.txt:', err);
    }
};

export const leerInstruccionesRuleta = () => {
    try {
        // Leemos el archivo veterinarias.txt de forma síncrona
        const data = fs.readFileSync('ruleta.txt', 'utf-8');

        console.log(data)

    } catch (err) {
        console.error('Error al leer o parsear el archivo veterinarias.txt:', err);
    }
};

export const leerInstruccionesTragamonedas = () => {
    try {
        // Leemos el archivo veterinarias.txt de forma síncrona
        const data = fs.readFileSync('tragamonedas.txt', 'utf-8');

        console.log(data)

    } catch (err) {
        console.error('Error al leer o parsear el archivo veterinarias.txt:', err);
    }
};

