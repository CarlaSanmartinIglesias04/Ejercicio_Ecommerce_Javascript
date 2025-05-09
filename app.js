
import express from 'express';
import router from './routes/productos.js';

import path from 'path';
import { fileURLToPath } from 'url';
//import productosRouter from './routes/productos.js';

const app = express();

// Necesario para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para JSON
app.use(express.json());

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal que devuelve tu HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

// API
//app.use('/api/productos', productosRouter);
//app.use('/productos', productosRouter);
app.use('/productos', router);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});