
import express from 'express';
import router from './routes/productos.js';
import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
//import productosRouter from './routes/productos.js';

const traducciones = JSON.parse(fs.readFileSync('./textos.json'));
const app = express();

app.set('view engine', 'ejs');

// Necesario para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para JSON
app.use(express.json());

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal que devuelve tu HTML
/*app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});*/
const productos = [
    {
        "name": "Disco Duro",
        "price": 120,
        "quantity": 23,
        "description": "Disco duro",
        "_id": "66f85d909fd5f4df3657f651"
    },
    {
        "name": "Auriculares",
        "price": 83,
        "quantity": 37,
        "description": "Auriculares inalambricos con cancelacion de ruido",
        "_id": "66f85d909fd5f4df3657f652"
    },
    {
        "name": "Alfombrilla",
        "price": 25,
        "quantity": 40,
        "description": "Alfombrilla caucho",
        "_id": "68077739bf7d35047a96f935"
    },
    {
        "name": "Raton",
        "price": 30,
        "quantity": 45,
        "description": "Raton ergonomico",
        "_id": "6807aacda9bd8608c6062a6f"
    },
    {
        "name": "Raton",
        "price": 30,
        "quantity": 50,
        "description": "Raton ergonomico",
        "_id": "680b98f67154c19a3baa4487"
    }
]
app.get('/', (req, res) => {
  res.render('index', { traducciones, productos });
});


// API
//app.use('/api/productos', productosRouter);
//app.use('/productos', productosRouter);
app.use('/productos', router);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});