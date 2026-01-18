const promptSync = require("prompt-sync")(); // Importa la libreria de prompt-sync(sirve para leer datos)

interface IEstudiante { // Define la estructura de un estudiante
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;
}

interface IResultado<T> { // Sirve para devolver respuestas
  ok: boolean;
  mensaje: string;
  data?: T;
}

class Estudiante implements IEstudiante { // implements obliga a cumplir con la interfaz de IEstudiante
  id: number; //variables
  nombre: string; //variables
  edad: number; //variables
  carrera: string; //variables
  activo: boolean; //variables
  promedio: number; //variables

  constructor( //se ejecuta cuando se crea un estudiante
    id: number,
    nombre: string,
    edad: number,
    carrera: string,
    promedio: number,
    activo: boolean = true
  ) { // guarda los valores dentro del objeto
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.carrera = carrera;
    this.promedio = promedio;
    this.activo = activo;
  }
}

class SistemaEstudiantes { // Maneja todo el sistema de estudiantes
  private estudiantes: Estudiante[] = []; // private significa que solo esta clase puede usarlo

  agregar(est: Estudiante): IResultado<Estudiante> { // Agrega un estudiante al sistema
    for (let e of this.estudiantes) { // Recorre la lista de estudiantes
      if (e.id === est.id) {
        return { ok: false, mensaje: "El ID ya existe" };
      }
    }

    if (est.edad < 15 || est.edad > 80) { //no permite edades fuera de este rango
      return { ok: false, mensaje: "La Edad no es válida" };
    }

    if (est.promedio < 0 || est.promedio > 10) { //el promedio debe estar entre 0 y 10
      return { ok: false, mensaje: "EL Promedio no es válido" };
    }

    this.estudiantes.push(est); //lo guarda en el arreglo
    return { ok: true, mensaje: "Estudiante agregado", data: est };
  }

  listar(): Estudiante[] { // Devuelve todos los estudiantes
    return this.estudiantes;
  }

  buscarPorId(id: number): IResultado<Estudiante> { // Busca un estudiante por su ID
    for (let e of this.estudiantes) { 
      if (e.id === id) { 
        return { ok: true, mensaje: "Estudiante encontrado", data: e };  //si lo encuentra lo devuelve
      }
    }
    return { ok: false, mensaje: "Estudiante no encontrado" }; //si no lo encuentra error
  }

  actualizarPromedio(id: number, nuevoPromedio: number): IResultado<Estudiante> { // Actualiza el promedio de un estudiante
    if (nuevoPromedio < 0 || nuevoPromedio > 10) {
      return { ok: false, mensaje: "Promedio inválido" }; //verifica que el promedio sea valido
    }

    for (let e of this.estudiantes) {
      if (e.id === id) {
        e.promedio = nuevoPromedio;
        return { ok: true, mensaje: "Promedio actualizado", data: e }; //si lo encuentra lo actualiza
      }
    }
    return { ok: false, mensaje: "Estudiante no encontrado" }; //si no lo encuentra error
  }

  cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> { // Cambia el estado de un estudiante
    for (let e of this.estudiantes) {
      if (e.id === id) {
        e.activo = activo;
        return { ok: true, mensaje: "Estado actualizado", data: e }; //si lo encuentra lo actualiza
      }
    }
    return { ok: false, mensaje: "Estudiante no encontrado" }; //si no lo encuentra error
  }

  listarActivos(): Estudiante[] { // Devuelve solo los estudiantes activos
    return this.estudiantes.filter(e => e.activo);
  }
}

function mostrarMenu(): void { // Muestra el menu de opciones
  console.log("SISTEMA DE ESTUDIANTES");
  console.log("1.- Agregar estudiante");
  console.log("2.- Listar estudiantes");
  console.log("3.- Buscar por ID");
  console.log("4.- Actualizar promedio");
  console.log("5.- Cambiar estado");
  console.log("6.- Listar activos");
  console.log("0.- Salir del Sistema");
}

function menuInteractivo(): void { //Imprime las opciones y lee las respuestas
  const sistema = new SistemaEstudiantes(); // Crea una el sistema
  let opcion: number;

  do {
    mostrarMenu();
    opcion = Number(promptSync("Seleccione una opción: ")); 

    switch (opcion) {
      case 1:
        const id = Number(promptSync("ID: "));
        const nombre = String(promptSync("Nombre: "));
        const edad = Number(promptSync("Edad: "));
        const carrera = String(promptSync("Carrera: "));
        const promedio = Number(promptSync("Promedio: "));
        console.log(
          sistema.agregar(
            new Estudiante(id, nombre, edad, carrera, promedio)
          )
        );
        break;

      case 2:
        console.log("LISTADO DE ESTUDIANTES");
        console.log(sistema.listar());
        break;

      case 3:
        const idBuscar = Number(promptSync("ID a buscar: "));
        console.log(sistema.buscarPorId(idBuscar));
        break;

      case 4:
        const idAct = Number(promptSync("ID: "));
        const nuevoProm = Number(promptSync("Nuevo promedio: "));
        console.log(sistema.actualizarPromedio(idAct, nuevoProm));
        break;

      case 5:
        const idEstado = Number(promptSync("ID: "));
        const estado = promptSync("Activo? (s/n): ") === "s";
        console.log(sistema.cambiarEstado(idEstado, estado));
        break;

      case 6:
        console.log("ESTUDIANTES ACTIVOS");
        console.log(sistema.listarActivos());
        break;

      case 0:
        console.log("Saliendo del sistema...");
        break;

      default:
        console.log("Opción inválida");
    }
  } while (opcion !== 0);
}

menuInteractivo();


