//Se crea la configuracion basica del servidor
import express from "express"
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import personasRoutes from './routes/personas.routes.js'


//Inicializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); // SE OBTIENE EL VALOR DEL DIRNAME


//Configuracion
app.set('PORT', process.env.PORT || 3000); //Abre en el puerto de la variable de entorno, si no hay, lo abre en el PORT3000
app.set('views',  join(__dirname, 'views')); // POSICION DE LAS VISTAS
app.engine('.hbs', engine({
    defaultLayout : 'main',//CAPA POR DEFECTO
    layoutsDir: join(app.get('views'), 'layouts'), // DIRECCION DE LAS CAPAS
    partialsDir: join(app.get('views'), 'partials'), //DIRECCION DE LOS PARTIALS
    extname:'hbs' //EXTENSION UTILIZADA
}));
app.set('view engine', '.hbs')//INICIALIZACION DEL VIEW ENGINE

//Middleware
app.use(morgan('dev')) // Permite ver las peticions que se hacen
app.use(express.urlencoded({extended:false}))
app.use(express.json()) // PERMITE TRABAJAR CON LOS JSON

//RUTAS
app.get('/', (req, res)=>{
    res.render('index')
})

app.use(personasRoutes)

//Archivos publicos
app.use(express.static(join(__dirname, 'public')));


//Ejecucion del servidor
app.listen(app.get('PORT'), () =>{
    console.log(`Server listening on PORT ${app.get('PORT')}`)
} );