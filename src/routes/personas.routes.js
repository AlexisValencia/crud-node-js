import { Router } from "express"; //Se importa router de express
import pool from "../database.js"; // Se importa el Pool de database creado

const router = Router();
//GET para el add, renderizado de formulario
router.get('/add', async (req, res) =>{
    res.render('personas/add')
});

//POST para la captura de los datos del formulario
router.post('/add', async(req, res)=>{
    try {
        const {name, lastname, age} = req.body;
        await pool.query(`
            INSERT INTO personas (name, lastname, age) 
            VALUES (?,?,?)`,
            [name,lastname,age]
        );
        res.redirect('/list')
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

//GET Envio al Editar desde la lista
router.get('/edit/:id', async (req, res)=>{
    try {
        const {id} = req.params; // Obtenemos el id destructurando el params
        const [result] = await pool.query(`SELECT * FROM personas WHERE id=${id}`) // Realiza la query
        const persona = result[0] //Obtenemos la posicion cero del array que es el contenido de la respuesta
        console.log({persona})
        res.render(`personas/edit`, {persona}) //Se envia el objeto tal cual descrito en edit.hbs
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

//POST para la captura de los datos del formulario
router.post('/edit/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const {name, lastname, age} = req.body;
        await pool.query(`
            UPDATE personas SET name=?, lastname=?, age=? 
            WHERE id=${id}`,
            [name,lastname,age]
        );
        res.redirect('/list')
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

//GET envio a eliminar
router.get('/delete/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM personas WHERE id=?', [id])
        res.redirect('/list')
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

//Cuando la perticion viene por la ruta list se ejecuta la consulta
router.get('/list', async(req, res) =>{
    try {
        //Guardo el array de la consulta mediante el pool connection
        // se usa await porque va a ser una promesa
        const [result] = await pool.query("SELECT * FROM personas")
        //Cuando se reciba la respuesta, se renderiza en la ruta personas/list un objeto
        // Al objeto se le debe poner el nombre que se ha establecido en el fichero  
        res.render('personas/list', {personas : result})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
} )

export default router;