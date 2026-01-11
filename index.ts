interface IEstudiante { //Definición de la interfaz IEstudiante
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;
}

interface IResultado<T> { //Definición de la interfaz IResultado genérica
  ok: boolean; //indica si la operación fue exitosa
  mensaje: string; //mensaje de respuesta
  data?: T; //dato opcional (puede venir o no)
}

class Estudiante implements IEstudiante { //Definición de la clase Estudiante que implementa la interfaz IEstudiante
  id: number; 
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;

  constructor( //Es un método especial para inicializar objetos de la clase
    id: number,
    nombre: string,
    edad: number,
    carrera: string,
    promedio: number,
    activo: boolean = true //valor por defecto
  ) 
  { //this se usa para asignar valores a las propiedades de la clase
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.carrera = carrera;
    this.promedio = promedio;
    this.activo = activo;
  }
}

class SistemaEstudiantes { //Es el núcleo del sistema, aquí se manejan los estudiantes
  private estudiantes: Estudiante[] = []; //private significa que solo la clase puede acceder 

  agregar(est: Estudiante): IResultado<Estudiante> { //Agrega un nuevo estudiante al sistema
    for (let e of this.estudiantes) { //Evitar que dos estudiantes tengan el mismo ID
      if (e.id === est.id) { 
        return { ok: false, mensaje: "ID ya existe" };
      }
    }

    if (est.edad < 15 || est.edad > 80) { //Evita edades irreales
      return { ok: false, mensaje: "Edad no válida" };
    }

    if (est.promedio < 0 || est.promedio > 10) { //El promedio debe estar entre 0 y 10
      return { ok: false, mensaje: "Promedio no válido" };
    }

    this.estudiantes.push(est); //lo guarda en el arreglo
    return { ok: true, mensaje: "Estudiante agregado", data: est };
  }

  listar(): Estudiante[] { //Devuelve todos los estudiantes
    return this.estudiantes;
  }

  buscarPorId(id: number): IResultado<Estudiante> { //Busca un estudiante por su ID
    for (let e of this.estudiantes) {
      if (e.id === id) {
        return { ok: true, mensaje: "Estudiante encontrado", data: e }; //Si lo encuentra, devuelve el estudiante
      }
    }
    return { ok: false, mensaje: "Estudiante no encontrado" }; //Si no lo encuentra, devuelve un mensaje de error
  }

  actualizarPromedio(id: number, nuevoPromedio: number): IResultado<Estudiante> { //Actualiza el promedio de un estudiante
    if (nuevoPromedio < 0 || nuevoPromedio > 10) {
      return { ok: false, mensaje: "Promedio inválido" }; //Valida el nuevo promedio
    }

    for (let e of this.estudiantes) {
      if (e.id === id) {
        e.promedio = nuevoPromedio;
        return { ok: true, mensaje: "Promedio actualizado", data: e }; //Devuelve el estudiante con el nuevo promedio
      }
    }
    return { ok: false, mensaje: "Estudiante no encontrado" }; 
  }

  cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> { //Cambia el estado activo/inactivo de un estudiante
    for (let e of this.estudiantes) {
      if (e.id === id) {
        e.activo = activo;
        return { ok: true, mensaje: "Estado actualizado", data: e };
      }
    }
    return { ok: false, mensaje: "Estudiante no encontrado" };
  }

  listarActivos(): Estudiante[] { //Devuelve solo los estudiantes activos
    let activos: Estudiante[] = [];
    for (let e of this.estudiantes) {
      if (e.activo) {
        activos.push(e);
      }
    }
    return activos;
  }

  promedioGeneral(): number { //Calcula el promedio general de todos los estudiantes
    let suma = 0;

    for (let e of this.estudiantes) {
      suma += e.promedio;
    }

    return this.estudiantes.length > 0 
      ? suma / this.estudiantes.length
      : 0;
  }
}

function mostrarMenu(): void { //Muestra el menú inicial
  console.log(" Sistema de Estudiantes ");
}

function ejecutarDemo(sistema: SistemaEstudiantes): void { //Función para demostrar el funcionamiento del sistema
  sistema.agregar(new Estudiante(1, "Mateo", 20, "Gastronomia", 9));
  sistema.agregar(new Estudiante(2, "Danny", 18, "Software", 8));
  sistema.agregar(new Estudiante(3, "Jairo", 19, "Derecho", 7));

  console.log(" LISTADO ");
  console.log(sistema.listar());

  console.log(" Buscar por ID (2) ");
  console.log(sistema.buscarPorId(2));

  console.log(" Actualizar Promedio ");
  console.log(sistema.actualizarPromedio(2, 9.5));

  console.log(" Cambiar Estado a Inactivo ");
  console.log(sistema.cambiarEstado(3, false));

  console.log(" Listar Solo Activos ");
  console.log(sistema.listarActivos());

  console.log(" Promedio General ");
  console.log(sistema.promedioGeneral());
}

mostrarMenu(); //Muestra el menú
const sistema = new SistemaEstudiantes(); //Crea una instancia del sistema
ejecutarDemo(sistema);
