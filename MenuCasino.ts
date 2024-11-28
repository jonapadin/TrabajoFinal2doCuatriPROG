import { Casino } from "./Clases/Casino"
import * as readlineSync from 'readline-sync';
import { Cliente } from "./Clases/Cliente";
import * as fs from 'fs';

let casino = new Casino
export function menuPrincipal() {
    console.log("**********************************************************")
    console.log(`Bienvenido al CASINO ! ${casino.getNombre()} `)
    console.log("**********************************************************")
    console.log("1- Registrarse")
    console.log("2- Iniciar Sesion")
    console.log("0- Salir")
    let opcion = readlineSync.questionInt("elija una opcion:")
    if (opcion === 1) {
        menuRegistro()
    }
    if (opcion === 2) {
        menuIniciarSesion()
    }
    if (opcion === 0) {
        return
    } else {

        menuPrincipal()
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
            casino.menu(cliente); // Asegúrate de tener implementado este método en Casino
            
        } else {
            console.log("No existe un usuario con ese DNI.");
        }
        
    } catch (err) {
        console.error("Hubo un error al leer el archivo:", err);
    }
}

export function elegirJuegos(){
    console.log("Juegos")
}

export function menuInstrucciones(){

}


export function leerInstruccionesDado(){
    fs.readFile("Ruleta.txt", "utf-8", (err,data)=>{
        if(data){
            console.log(data);
        } else if(err){
            console.log(err);
            
        }     
    })
}