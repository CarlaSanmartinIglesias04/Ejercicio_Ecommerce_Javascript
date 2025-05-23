import express from 'express';
import { APIService } from '../apiService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const productos = await APIService.obtenerProductos();
  res.json(productos);
});

router.get('/:id', async (req, res) => {
  const producto = await APIService.obtenerProductoPorId(req.params.id);
  res.json(producto);
});

router.post('/', async (req, res) => {
  await APIService.crearProducto(req.body);
  res.status(201).send();
});

router.put('/:id', async (req, res) => {
  await APIService.actualizarProducto(req.params.id, req.body);
  res.status(204).send();
});

router.delete('/:id', async (req, res) => {
  await APIService.eliminarProducto(req.params.id);
  res.status(204).send();
});

export default router;
