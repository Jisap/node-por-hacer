
const fs = require('fs'); // Requerimos el sistema de archivos


let listadoPorHacer = []  // Array de tareas por hacer

const guardarDB = () => {                                       // Función para hacer persistente la lista de tareas en una bd

    let data = JSON.stringify(listadoPorHacer);                 // Convertimos la lista de tareas a formato json

    fs.writeFile('db/data.json', data, (err) => {               // Guardamos la lista en el archivo data.json

          if (err) throw new Error( 'No se pudo grabar' , err)  //Si hay error se muestra a traves del throw
                                                            
        });
}

const cargarDB = () => {                                    // Función para leer el listado de tareas

    try{
        
        listadoPorHacer = require('../db/data.json');       // Requerimos el archivo donde guardamos la lista de tareas.

    }catch(error){

        listadoPorHacer=[];                                 // Si es la primera vez el listado de tareas debe tener algún contenido aunque sea vacio.

    }
}

const crear = (descripcion) => {        //Función para crear una tarea , descripcion es el argumento y coincide con el nombre de la tarea

        cargarDB();                     //Cargamos la lista de tareas 

        let porHacer = {                // Definimos la tarea
            //descripcion: descripcion
            descripcion,
            completado: false
        };

        listadoPorHacer.push(porHacer); // La metemos en el array de tareas

        guardarDB();                    // La lista de tareas se convierte en data.json

        return porHacer;                // Retornamos una tarea
}

const getListado = () => {

    cargarDB();                 // Cargamos data.json

    return listadoPorHacer;     // Devolvemos un [] de las listas por hacer    

}

const actualizar = (descripcion, completado=true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion); // Índice en data.json de la tarea que coincida con descripcion

    if ( index >=0 ){ //Encontró algo coincidente
        listadoPorHacer[index].completado = completado; //La prop completado de la tarea encontrada = argumento completado(true/false que venga por consola) 
        guardarDB();//Grabamos cambios
        return true;//La tarea se hizo correctamente
    }else{
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion); // Nuevo listado sin la tarea de los argumentos

    if(listadoPorHacer.length === nuevoListado.length){ // Si el listado antiguo es = al nuevo no se borro nada
        return false
    }else{
        listadoPorHacer=nuevoListado
        guardarDB();
        return true;
    }
}

module.exports={
    crear, getListado, actualizar, borrar
}