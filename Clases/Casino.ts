
import { TragamonedaLucky } from './TragamonedaV1';

import { Cliente } from './Cliente';
import { Dado } from './Dado';
import { JuegoSlot } from "./JuegoSlot";
import { Ruleta } from './Ruleta';
import { TragamonedaFruit } from './TragamonedaV2';
import * as readlineSync from 'readline-sync';
import * as fs from 'fs';


export class Casino {
    private cliente: Cliente[];
    private juegos:JuegoSlot[];
    private nombre : string;

    constructor() {
        this.juegos = []; 
        this.cliente = [];
        this.nombre = "BinBaires"
    }

    getNombre():string{
        return this.nombre
    }
    getCliente (){
        return this.cliente
    }

 menuPrincipal() {
        console.log("**********************************************************")
        console.log(`Bienvenido al CASINO ! ${this.getNombre()} `)
        console.log("**********************************************************")
        console.log("1- Registrarse")
        console.log("2- Iniciar Sesion")
        console.log("0- Salir")
        let opcion = readlineSync.question("elija una opcion:")
        
        switch(opcion) {
            case "1": 
                this.menuRegistro();
            break;
            case "2":
                this.menuIniciarSesion();
            break;
            case "0": 
            return
            default:
                console.log("Operacion no valida")
                this.menuPrincipal();
        }
    
    
    }
    
    

    public agregarCliente (cliente:Cliente):void{
        if (cliente.getEdad()<18){
            console.log ("Tienes que ser mayor de 18 años para poder entrar"); //valida la edad del cliente
        }else{
            this.cliente.push(cliente); 
            console.log  ("El cliente: ",cliente.getNombre(), "fue agregado al casino"); 
        }
    }

    //Registro  
    menuRegistro() {
        let nombreUsuario = readlineSync.question("Ingrese Nombre: ")
        let edad = readlineSync.questionInt("Ingrese su Edad: ")
        let dni = readlineSync.question("Ingrese su DNI: ")
        this.validacionCampo(nombreUsuario, edad, dni)
        this.registrarCliente(nombreUsuario,edad,dni);
    
    }

    menuIniciarSesion(dado?:Dado,ruleta?:Ruleta,tragamoneda1?:TragamonedaFruit, tragamoneda2?:TragamonedaLucky) { 
        let dniUsuario = readlineSync.question("Ingrese su DNI para iniciar sesion: ")
        this.seleccionarUsuario(dniUsuario);
     }

     registrarCliente(nombreUsuario:string,edad:number,dni:string){
        let cliente = new Cliente(nombreUsuario,edad,dni)
        this.agregarCliente(cliente)
        console.log ("Cliente agregado con Exito")
        this.guardarEnArchivo("cliente.txt", this.getCliente())
    }

    guardarEnArchivo(nombreArchivo: string, datos: any[]): void {
        try {
            // Convertir los datos a formato JSON
            const contenido = JSON.stringify(datos, null, 2); // El "2" es para formatear el JSON con indentación para que sea legible
    
    
            fs.writeFileSync(nombreArchivo, contenido, 'utf8');
            console.log(`El archivo se guardó correctamente como ${nombreArchivo}`);
        } catch (err) {
    
            console.error("Hubo un error al guardar el archivo: ", err);
        }
    }

     validacionCampo(nombreUsuario: string, edad: number, dni: string) {
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

    seleccionarUsuario(dni: string) {
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
            this.menu(cliente); // Asegúrate de tener implementado este método en Casino
                
            } else {
                console.log("No existe un usuario con ese DNI.");
            }
            
        } catch (err) {
            console.error("Hubo un error al leer el archivo:", err);
        }
    }

    //METODO PARA AGREGAR JUEGOS AL CASINO
    public agregarJuegos(ruleta:Ruleta,dado:Dado,tragamoneda1:TragamonedaFruit,tragamoneda2:TragamonedaLucky): void{
        this.juegos.push(ruleta);
        this.juegos.push(dado);
        this.juegos.push(tragamoneda1);
        this.juegos.push(tragamoneda2);
        this.juegos.forEach(juego => {
        console.log ("El juego : ", juego.getNombre(), `fue agregado al casino`);
        }); 
    }
    


     menuJuegos(cliente:Cliente){

      if(this.agregarJuegos.length === 0) {
        console.log("No hay juegos disponibles");
      }else {
        console.log(`1. Iniciar Ruleta `);
        console.log(`2. Iniciar Dado`);
        console.log(`3. Iniciar Tragamoneda Fruit`);
        console.log(`4. Iniciar Tragamoneda Lucky`);
        console.log(`5. volver`);
    
        const opcion = readlineSync.question("Seleccione un juego: "); 
    
        switch(opcion){
            case "1":
                this.crearRuleta();
                break
            case "2":
                this.crearDado();
                break
                case "3":
                this.crearTragamonedaFruit();
                    break
                case "4":
                this.crearTragamonedaLucky();
                    break
            case "5":
                this.menu(cliente);
                break
            default:
                "Operacion no valida"   
        }
        this.menuJuegos(cliente);
      }
    }


    menuInstrucciones(cliente:Cliente){
        console.log(`1. Instrucciones juego: Dado `);
        console.log(`2. Instrucciones juego: Ruleta`);
        console.log(`3. Instrucciones juegos: Tragamonedas`);
        console.log(`4. volver`);
    
    
        const opcion = readlineSync.question("Elige una opcion: "); 
        
        switch(opcion){
            case "1":
                this.instruccionesDado();
            break;
            case "2":
                this.instruccionesRuleta();
            break;
            case "3":
              this.instruccionesTragamoneda();
               break;
             case "4": 
             this.menu(cliente);
             break
             default:
                console.log("Operacion no valida")
              
        }
       this.menuInstrucciones(cliente);
    }

    menu(cliente:Cliente): void{

        console.log("******************************************************************************"); 
        console.log (`Bienvenido ${cliente.getNombre()} a el casino: ${this.getNombre()} !. Tu saldo actual es de: ${cliente.getSaldo()}`); 
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
                this.menuJuegos(cliente);
                break
            case "3":
                this.menuInstrucciones(cliente);
                break
            default: console.log("Eliga una opcion valida")
        }
        this.menu(cliente);
    }

    
    instruccionesDado(): void {
        try {
            const data = fs.readFileSync('dado.txt', 'utf-8');
    
            console.log(data)
    
        } catch (err) {
            console.error('Error al leer o parsear el archivo tragamoneda.txt:', err);
        }
    }


    instruccionesRuleta(): void {
        try {
            const data = fs.readFileSync('ruleta.txt', 'utf-8');
    
            console.log(data)
    
        } catch (err) {
            console.error('Error al leer o parsear el archivo tragamoneda.txt:', err);
        }
    }

    instruccionesTragamoneda(): void {
        try {
            const data = fs.readFileSync('tragamonedas.txt', 'utf-8');
    
            console.log(data)
    
        } catch (err) {
            console.error('Error al leer o parsear el archivo tragamoneda.txt:', err);
        }
    }

    
    crearRuleta(){
        const ruleta = new Ruleta()
        ruleta.iniciarJuego();
        ruleta.jugar();
    }

    
  crearDado(){
    const dado = new Dado();
    dado.iniciarJuego();
    dado.jugar();;
}

crearTragamonedaLucky(){
    const tragamoneda = new TragamonedaLucky();
    tragamoneda.iniciarJuego();
    tragamoneda.jugar();
}

crearTragamonedaFruit(){
    const tragamoneda = new TragamonedaFruit()
    tragamoneda.iniciarJuego()
    tragamoneda.jugar();
}

}
