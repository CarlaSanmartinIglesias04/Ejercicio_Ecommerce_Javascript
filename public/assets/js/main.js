import  InventarioApp  from './inventarioApp.js';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("crear").addEventListener("click", () => {
    InventarioApp.crearOActualizarProducto();
  });

  const botonMostrar = document.getElementById("mostrar");
  const lista = document.getElementById("listaProductos");
  let mostrando = false;

  botonMostrar.addEventListener("click", async () => {
    mostrando = !mostrando;

    if (mostrando) {
      botonMostrar.textContent = "Ocultar productos";
      await InventarioApp.listaProductos();
    } else {
      botonMostrar.textContent = "Mostrar productos";
      lista.textContent = "";
    }
  });
});

