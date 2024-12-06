import { TragamonedaLucky } from './TragamonedaV1';
import { Cliente } from './Cliente';
import { Dado } from './Dado';
import { Maquina } from "./Maquina";
import { Ruleta } from './Ruleta';
import { TragamonedaFruit } from './TragamonedaV2';
import * as readlineSync from 'readline-sync';
import * as fs from 'fs';
import * as chalk from 'chalk';

export class Casino {
    private clientes: Cliente[];
    private juegos:Maquina[];
    private nombre : string;

    constructor() {
        this.juegos = []; 
        this.clientes = [];
        this.nombre = "BinBaires"
    }

    public getNombre():string{
        return this.nombre
    }
    public getCliente (){
        return this.clientes
    }

    public menuPrincipal() {
        const figlet = require("figlet");
        figlet.text(
            `Bienvenido al CASINO!  ${this.getNombre()}`,
            {
                font: "Standard", 
                horizontalLayout: "fitted", 
                verticalLayout: "fitted", 
                width: 100,
                whitespaceBreak: true, 
            },
            (err: Error | null, data: string | undefined) => {
                if (err) {
                    console.log("Ha ocurrido un error inesperado...");
                    console.dir(err);
                    return;
                }
                console.log("******************************************************************************************************");
                console.log(data);
                console.log("******************************************************************************************************");
                console.log("")
                console.log("1️⃣1 Registrarse");
                console.log("2️⃣2 Iniciar Sesion");
                console.log("0️⃣0 Salir");
    
                // Obtener opción del usuario
                console.log("");
                const chalk = require('chalk');

                let opcion = readlineSync.question(chalk.blue('Ingrese una opcion: '));
                console.log("")
    
                // Manejar opciones
                switch (opcion) {
                    case "1":
                        this.menuRegistro();
                        break;
                    case "2":
                        this.menuIniciarSesion();
                        break;
                    case "0":
                        console.log("Gracias por visitar el casino. ¡Hasta luego!");
                        return;
                    default:
                        console.log("Operación no válida. Intente de nuevo.");
                        this.menuPrincipal();
                }
            }
        );
    }

    //Registro de cliente
    public menuRegistro() {
        this.crearCliente()
    
    }

    public crearCliente(cliente?: Cliente | null) {
        let data: string;
        try {
            data = fs.readFileSync("clientes.txt", "utf-8");
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return;
        }
    
        let nombreUsuario: string = readlineSync.question(chalk.yellow("Ingrese Nombre: "));
        let edad: number = readlineSync.questionInt(chalk.yellow("Ingrese Edad: "));
        let dni: string = readlineSync.question(chalk.yellow("Ingrese DNI: "));
    
        while (!nombreUsuario || !nombreUsuario.toLowerCase().replace(/[^a-z\#\&]+/g, "")) {
            nombreUsuario = readlineSync.question(chalk.yellow("Por favor ingrese un nombre valido: "));
        }
    
        while (!edad || edad < 18) {
            edad = readlineSync.questionInt(chalk.yellow("Por favor ingrese una edad (mayor de 18): "));
        }
    
        while (!dni || dni.length < 8 || dni.length >= 9) {
            dni = readlineSync.question(chalk.yellow("Por favor ingrese dni valido (8 digitos): "));
        }
    
        // Parseamos los datos
        const clientesTxt: {
            nombre: string,
            edad: number,
            dni: string,
            saldo: number
        }[] = JSON.parse(data);
    
        // Buscamos el cliente por su dni
        let clienteIndex = clientesTxt.findIndex((c) => c.dni === dni);
    
        // Si el cliente no existe, lo agregamos como nuevo
        if (clienteIndex === -1) {
            cliente = new Cliente(nombreUsuario, edad, dni);
            this.agregarCliente(cliente);
            // Agregar cliente al archivo
            clientesTxt.push({
                nombre: cliente.getNombre(),
                edad: cliente.getEdad(),
                dni: cliente.getDni(),
                saldo: cliente.getSaldo()
            });
        } else {
            console.log("");
            console.log(chalk.bgRed("Ya existe un usuario con ese dni."));
            console.log("");
            this.menuPrincipal();
        }
    
        // Guardamos los datos actualizados en el archivo
        try {
            fs.writeFileSync("clientes.txt", JSON.stringify(clientesTxt, null, 2), "utf8");
            console.log("");
            console.log(chalk.bgYellow("El archivo clientes.txt ha sido actualizado correctamente."));
        } catch (error) {
            console.log("");
            console.error(chalk.bgRed("Error al guardar el archivo:", error));
        }
    
        // Agregar al casino
        if (cliente) {
            this.agregarCliente(cliente);
        }
    }
    
    public agregarCliente(cliente: Cliente): void {
        if (cliente.getEdad() < 18) {
            console.log("");
            console.log(chalk.bgRed("Tienes que ser mayor de 18 años para poder registrarte"));
        } else {
            this.clientes.push(cliente);
            console.log("");
            console.log(chalk.bgGreen("El cliente:", cliente.getNombre(), "fue registrado con exito!"));
        }
    }

    public menuIniciarSesion(dado?:Dado,ruleta?:Ruleta,tragamoneda1?:TragamonedaFruit, tragamoneda2?:TragamonedaLucky) { 
        console.log("");
        let dniUsuario = readlineSync.question(chalk.yellow("Ingrese su DNI para iniciar sesion: "));
        let intentos = 1;
        while(!dniUsuario || intentos === 2 ) {
            console.log("");
            readlineSync.question(chalk.yellow("Ingrese su DNI para iniciar sesion: "));
            if(intentos === 3 ){
                console.log("");
                console.log(chalk.red("❌ Alcanzaste el limite de intentos, vuelve a intentarlo mas tarde!"))
                return
            }
            intentos++
        }
        this.seleccionarUsuario(dniUsuario);
     }

    public registrarCliente(nombreUsuario:string,edad:number,dni:string){
        let cliente = new Cliente(nombreUsuario,edad,dni)
        this.agregarCliente(cliente)
        this.guardarEnArchivo("cliente.txt", this.getCliente())
    }

    public guardarEnArchivo(nombreArchivo: string, datos: any[]): void {
        try {
            // Convertir los datos a formato JSON
            const contenido = JSON.stringify(datos, null, 2); // El "2" es para formatear el JSON con indentación para que sea legible
    
    
            fs.writeFileSync(nombreArchivo, contenido, 'utf8');
            console.log("");
            console.log(chalk.green(`✅ El archivo se guardó correctamente como ${nombreArchivo}`));
        } catch (err) {
            console.log("");
            console.error(chalk.bgRed("Hubo un error al guardar el archivo: ", err));
        }
    }

    public seleccionarUsuario(dni: string) {
        try {
            // Leer el archivo de manera sincrónica
            const data = fs.readFileSync('clientes.txt', 'utf-8');
    
            // Parsear los datos a JSON
            const clienteTxt: { nombre: string; edad: number; dni: string, saldo:number }[] = JSON.parse(data);
    
            // Mapear a instancias de Cliente
            const clientes: Cliente[] = clienteTxt.map(
                (cliente) => new Cliente(cliente.nombre, cliente.edad, cliente.dni, cliente.saldo)
            );
    
            // Buscar el cliente por DNI
            const cliente = clientes.find((v) => v.getDni() === dni);
    
            if (cliente) {

                console.log(chalk.bgBlue(`✨ Bienvenido ${cliente.getNombre()} seras redirigido al casino! ✨`));
                // Aquí puedes redirigir al menú principal del casino para clientes registrados
            this.menu(cliente); // Asegúrate de tener implementado este método en Casino
                
            } else {
                console.log("");
                console.log(chalk.red("❌ No existe un usuario con ese DNI."));
            }
            
        } catch (err) {
            console.log('');
            console.error(chalk.bgRed("Hubo un error al leer el archivo:", err));
        }
    }

    //METODO PARA AGREGAR JUEGOS AL CASINO
    public agregarJuegos(ruleta:Ruleta,dado:Dado,tragamoneda1:TragamonedaFruit,tragamoneda2:TragamonedaLucky): void{
        this.juegos.push(ruleta);
        this.juegos.push(dado);
        this.juegos.push(tragamoneda1);
        this.juegos.push(tragamoneda2);
        this.juegos.forEach(juego => {
        console.log (chalk.green("El juego🎰 : ", juego.getNombre(), `fue agregado al casino`));
        }); 
    }

    public menuJuegos(cliente:Cliente){

      if(this.agregarJuegos.length === 0) {
        console.log(chalk.bgBlue("No hay juegos disponibles"));
    }else {
        console.log(`1️⃣1 Iniciar Ruleta `);
        console.log(`2️⃣2 Iniciar Dado`);
        console.log(`3️⃣3 Iniciar Tragamoneda Fruit`);
        console.log(`4️⃣4 Iniciar Tragamoneda Lucky`);
        console.log(`5️⃣5 volver`);
        
        const opcion = readlineSync.question(chalk.blue("Seleccione un juego: ")); 
    
        switch(opcion){
            case "1":
                this.crearRuleta(cliente);
                
                break
            case "2":
                this.crearDado(cliente);
                break
                case "3":
                this.crearTragamonedaFruit(cliente);
                    break
                case "4":
                this.crearTragamonedaLucky(cliente);
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

    public menuInstrucciones(cliente:Cliente){
        console.log(`1️⃣1 Instrucciones juego: Dado 🎲`);
        console.log(`2️⃣2 Instrucciones juego: Ruleta 🎡`);
        console.log(`3️⃣3 Instrucciones juegos: Tragamonedas 🎰`);
        console.log(`4️⃣4 volver`);
    
    
        const opcion = readlineSync.question(chalk.blue("Ingrese una opcion: ")); 
        
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
                console.log(chalk.red("🔴 Operacion no valida"));
              
        }
       this.menuInstrucciones(cliente);
    }

    public menu(cliente:Cliente): void{
        console.log("");

        console.log("#########################################################################"); 
        console.log (chalk.bgGreen(`Bienvenido ${cliente.getNombre()} a el casino: ${this.getNombre()} !. Tu saldo actual es de: ${cliente.getSaldo()}`)); 
        console.log("#########################################################################"); 
    
        console.log("");
        console.log(`1️⃣1 Agregar Saldo `);
        console.log(`2️⃣2 Seleccionar juegos`);
        console.log(`3️⃣3 Ver Instrucciones`);
        console.log(`4️⃣4 Retirar dinero`);
        console.log(`5️⃣5 Cerrar sesion`);
    
        console.log("-----------------------------------------------------------------"); 
        //Leer opcion del cliente
        const opcion = readlineSync.question(chalk.yellow("Elige una opcion: ")); 
    
        switch(opcion){
            case "1":
            //Opcion de recarga
            const recargaSaldo = readlineSync.questionInt(chalk.yellow("Cuanto dinero desea ingresar a su cuenta?: ")); 
            cliente.agregarSaldo(recargaSaldo);
                break
            case "2":
                this.menuJuegos(cliente);
                break
            case "3":
                this.menuInstrucciones(cliente);
                break
            case "4":
                break 
            case "5":
                fs.readFile("clientes.txt", 'utf-8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    // Parsear el contenido del archivo a un array de objetos
                    const clientesTxt: { nombre: string, edad: number, dni: string, saldo: number }[] = JSON.parse(data);
                
                    // Buscar el cliente en el array usando el DNI
                    let clienteIndex = clientesTxt.findIndex((c) => c.dni === cliente.getDni());
                
                    if (clienteIndex === -1) {
                        console.log("");
                        console.log(chalk.red("No se encontró un cliente con ese DNI."));
                        return;
                    }
                    // Actualizamos el saldo del cliente
                    clientesTxt[clienteIndex].saldo = cliente.getSaldo(); // Actualizamos el saldo con el nuevo valor
               
                    // Escribir los datos modificados de nuevo en el archivo
                    fs.writeFile("clientes.txt", JSON.stringify(clientesTxt, null, 2), (err) => {
                        if (err) {
                            console.error(chalk.bgRed("🔴 Error al guardar los datos del cliente:", err));
                            return;
                        }
                        console.log("");
                        console.log(chalk.bgGreen("✅ Datos del cliente actualizados correctamente."));
                    });
                    console.log("");
                    console.log(chalk.bgBlue("Cerrando sesión, gracias, ¡vuelve pronto!"));
                });
                return  
            default: console.log("Eliga una opcion valida")
        }
        this.menu(cliente);
    }

    public instruccionesDado(): void {
        try {
            const data = fs.readFileSync('dado.txt', 'utf-8');
    
            console.log(data)
    
        } catch (err) {
            console.error((chalk.bgRed('🔴 Error al leer o parsear el archivo tragamoneda.txt:', err)));
        }
    }

    public instruccionesRuleta(): void {
        try {
            const data = fs.readFileSync('ruleta.txt', 'utf-8');
    
            console.log(data)
    
        } catch (err) {
            console.error(chalk.bgRed('🔴 Error al leer o parsear el archivo tragamoneda.txt:', err));
        }
    }

    public instruccionesTragamoneda(): void {
        try {
            const data = fs.readFileSync('tragamonedas.txt', 'utf-8');
    
            console.log(data)
    
        } catch (err) {
            console.error(chalk.bgRed('🔴 Error al leer o parsear el archivo tragamoneda.txt:', err));
        }
    }
    
    public crearRuleta(cliente:Cliente){
        const ruleta = new Ruleta(cliente)
        ruleta.iniciarJuego();
        ruleta.jugar(); 
        cliente.getSaldo()
    }
    
    public crearDado(cliente:Cliente){
    const dado = new Dado(cliente);
    dado.iniciarJuego();
    dado.jugar();
    cliente.getSaldo()
    }

    public crearTragamonedaLucky(cliente:Cliente){
    const tragamoneda = new TragamonedaLucky(cliente);
    tragamoneda.iniciarJuego();
    tragamoneda.jugar();
    cliente.getSaldo()
    }

    public crearTragamonedaFruit(cliente:Cliente){
    const tragamoneda = new TragamonedaFruit(cliente)
    tragamoneda.iniciarJuego()
    tragamoneda.jugar();
    cliente.getSaldo()
    }
}