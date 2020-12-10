

const opts = {
    descripcion: {
            demand: true,    // Cuando pongamos en consola node app listar requerirá que aparezca el argumento descripcion
            alias: 'd',      // En lugar de poner --descripcion solo tendremos que poner node app listar/crear/actualizar -d "tarea"
            desc: 'Descripción de la tarea por hacer'    
        },
    completado: {
            alias: 'c',      // Alias 'c'
            default: true,    // La tarea por defecto estará completada
            desc: 'Marca como completado o pendiente una tarea'
            },
    
}

const argv = require('yargs')
              .command('listar', 'Imprime en consola la lista de tareas')
              .command('crear', 'Genera una tarea nueva de la lista de tareas',opts)
              .command('actualizar', 'Actualiza el estado completado de una tarea concreta',opts)
              .command('borrar', 'Borra un registro de la lista de tareas', opts)
              .help()
              .argv;

module.exports = {
    argv
}