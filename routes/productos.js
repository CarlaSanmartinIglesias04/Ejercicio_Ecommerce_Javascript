
import express from 'express';
import { APIService } from '../apiService.js';

//instancia de un enrutador modular (mini-app de Express para definir rutas (get, post, etc.) )
const router = express.Router();

router.get('/', async (req, res) => {
  const productos = await APIService.obtenerProductos();
  res.json(productos);
});
//El 201 indica q se creó exitosamente un nuevo recurso
router.get('/:id', async (req, res) => {
  const producto = await APIService.obtenerProductoPorId(req.params.id);
  res.json(producto);
});

router.post('/', async (req, res) => {
  await APIService.crearProducto(req.body);
  res.status(201).send();
});
//El 204 indica q la operacion fue exitosa pero no tiene nada q devolver
//req.params es un objeto q guarda el parametro
router.put('/:id', async (req, res) => {
  await APIService.actualizarProducto(req.params.id, req.body);
  res.status(204).send();
});

router.delete('/:id', async (req, res) => {
  await APIService.eliminarProducto(req.params.id);
  res.status(204).send();
});

export default router;
