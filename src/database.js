import { createPool } from "mysql2/promise"; //TENDRA CONEXION ASYNC POR ESO CON PROMISE

//LAS VARIABLES PUEDEN VENIR DEL ENV PARA DEV O PRODUCCION
const pool = createPool({
    host: 'localhost',
    port: 3306, //PUERTO DEFINIDO EN LA BD
    user: 'alexisnode', //USUARIO DADO EN LA BD
    password: 'alexis', // CONTRASEÑA EN LA BD
    database: 'Prueba01' //BASE DE DATOS A USAR
});

export default pool;
