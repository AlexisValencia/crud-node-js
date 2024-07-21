## CRUD NODE TUTO
EN ESTE CRUD SE VA A UTILIZAR:

*	NODE JS
*	EXPRESS 
*	Express-handlebars para el manejo de plantillas
*	Morgan
*	Mysql2
## INSTRUCCIÓN TERMINAL PARA LAS INSTALACIONES
*	Npm install npm@latest para instalar la última versión de npm
*	Npm install node@latest para instalar la última versión de node
*	Npm init –y para inicializar el package JSON de la aplicación
*	npm i express express-handlebars morgan mysql2 para la creación de los modulos
## SE CREAN LA CARPETA SRC EN LA RAIZ Y DENTRO SE CREAN LAS SIGUIENTES CARPETAS
-->	SRC
*	Database
*	Public
*	Views --> Layouts --> main.hbs
*	partials
*	Routes
## SE CREA SRC EL index.js

## SE INSTALA NODEMON PARA NO TENER QUE REINICIAR EL SERVIDOR CONSTANTEMENTE
*	npm install nodemon@latest -D
*	Se cambia en package.json en scripts, se añade “dev”:”nodemon ./src/index,js”
*	npm run dev para incializar 

## VALIDACION DE PARAMETROS
Puedes usar paquetes como express-validator para validación y saneamiento, y helmet para añadir algunas cabeceras de seguridad HTTP:
-->	npm install express-validator helmet


## Para mejorar el código y hacerlo más robusto para su uso tanto en entornos de desarrollo como de producción, puedes seguir estas prácticas recomendadas:

Uso de variables de entorno: Esto permite configurar diferentes parámetros para entornos de desarrollo y producción sin modificar el código.
Manejo de errores: Agregar manejo de errores para la conexión a la base de datos.
Configuración de la conexión: Incluir algunas configuraciones adicionales para la conexión de la base de datos.
Logs y depuración: Añadir logs para facilitar la depuración y monitoreo.
Seguridad: Asegúrate de no exponer información sensible en el código fuente.

## Paso 1: Instalar dotenv
Primero, instala dotenv para manejar variables de entorno:
--> npm install dotenv

## Paso 2: Crear un archivo .env
Crea un archivo .env en la raíz de tu proyecto y añade las variables de entorno necesarias:
# Archivo .env

# Configuración de la base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=alexisnode
DB_PASSWORD=alexis
DB_NAME=Prueba01

# Otros valores específicos del entorno de producción o desarrollo
NODE_ENV=development

## Paso 3: Configurar el Código para Usar Variables de Entorno
Actualiza tu archivo de configuración de la base de datos para usar las variables de entorno:

database.js

import { createPool } from "mysql2/promise"; // TENDRA CONEXION ASYNC POR ESO CON PROMISE
import dotenv from "dotenv";
import debug from "debug";

// Cargar variables de entorno
dotenv.config();

// Configurar debug
const log = debug('app:db');

// Crear el pool de conexiones
const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Probar la conexión a la base de datos
pool.getConnection()
    .then(conn => {
        log('Connected to the database.');
        conn.release();
    })
    .catch(err => {
        log('Unable to connect to the database:', err);
    });

export default pool;

## Paso 4: Configurar debug para Logs
Instala debug para manejar logs de manera eficiente:
--> npm install debug



## Explicación del Código Mejorado
* Uso de dotenv: Cargamos las variables de entorno desde un archivo .env, lo que facilita la configuración en diferentes entornos.
* Logs con debug: Utilizamos debug para manejar logs de manera más eficiente y configurable. Esto ayuda a tener un mejor seguimiento de las operaciones de la base de datos.
* Probar la Conexión: Intentamos establecer una conexión inicial para asegurarnos de que los parámetros de conexión son correctos y la base de datos está accesible.
* Configuración Adicional del Pool: Configuramos opciones adicionales como waitForConnections, connectionLimit y queueLimit para mejorar el rendimiento y manejo de conexiones.


## Tips Adicionales
* Manejo de Errores: Siempre maneja los errores de conexión y realiza una reconexión en caso de pérdida de conexión.
* Seguridad: Nunca almacenes credenciales de base de datos directamente en el código fuente, siempre usa variables de entorno.
* Monitoreo: Considera agregar herramientas de monitoreo para tus bases de datos en producción para detectar y solucionar problemas más rápido.
* Escalabilidad: Configura el connectionLimit según el uso esperado de la aplicación para asegurar que no se exceda la capacidad del servidor de la base de datos.