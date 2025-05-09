import Utils from './utils.js';
import { APIService } from './APIService.js';


export  default class InventarioApp {
  static productoEditandoId = null;

  static async crearOActualizarProducto() {
    const producto = {
      name: Utils.sanitizeInput(document.getElementById("nombre").value),
      price: parseFloat(document.getElementById("precio").value),
      quantity: parseInt(document.getElementById("cantidad").value),
      description: Utils.sanitizeInput(document.getElementById("descripcion").value)
    };

    if (!Utils.isSafeInput(producto.name) || !Utils.isSafeInput(producto.description)) {
      alert("Por favor, evita caracteres especiales en el nombre o descripción.");
      return;
    }

    if (producto.price <= 0 || producto.quantity < 0) {
      alert("El precio y la cantidad deben ser números positivos.");
      return;
    }

//Preguntar esto

    if (this.productoEditandoId) {
      await APIService.actualizarProducto(this.productoEditandoId, producto);
      alert("Producto actualizado con éxito!");
      document.getElementById("crear").textContent = "Crear";
      this.productoEditandoId = null;
    } else {
      await APIService.crearProducto(producto);
      alert("Producto creado con éxito!");
    }

    Utils.limpiarFormulario();
    this.listaProductos();
  }

  static async listaProductos() {
    const contenedor = document.getElementById("listaProductos");
    contenedor.className = "product-list";
    contenedor.innerHTML = "<center><p class='text'>Cargando...</p></center>";

  
    if (!(await APIService.verificarConexion())) {
      contenedor.innerHTML = "<p class='text' style='color:red;'>No se pudo conectar con la API.</p>";
      return;
    }
  
    const data = await APIService.obtenerProductos();
    contenedor.innerHTML = "";
  
    data.forEach(producto => {
      const card = document.createElement("div");
  
      const entradaBtn = document.createElement("button");
      entradaBtn.className = "button";
      entradaBtn.textContent = "Entrada";
      entradaBtn.addEventListener("click", () => this.entradaProducto(producto._id));
  
      const salidaBtn = document.createElement("button");
      salidaBtn.className = "button";
      salidaBtn.textContent = "Salida";
      salidaBtn.addEventListener("click", () => this.salidaProducto(producto._id));
  
      const editarBtn = document.createElement("button");
      editarBtn.className = "button";
      editarBtn.textContent = "Editar";
      editarBtn.addEventListener("click", () => this.editarProducto(producto._id));
  
      const eliminarBtn = document.createElement("button");
      eliminarBtn.className = "button";
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.addEventListener("click", () => this.eliminarProducto(producto._id));
  
      card.innerHTML = `
        <h3 class="text text--heading-3">${producto.name}</h3>
        <p class="text"><strong>Precio:</strong> ${producto.price}</p>
        <p class="text"><strong>Cantidad:</strong> ${producto.quantity}</p>
        <p class="text"><strong>Descripción:</strong> ${producto.description}</p>
      `;
      card.appendChild(entradaBtn);
      card.appendChild(salidaBtn);
      card.appendChild(editarBtn);
      card.appendChild(eliminarBtn);
  
      contenedor.appendChild(card);
    });
  }
  

  static async eliminarProducto(id) {
    await APIService.eliminarProducto(id);
    this.listaProductos();
  }

  static async editarProducto(id) {
    const producto = await APIService.obtenerProductoPorId(id);

    document.getElementById("nombre").value = producto.name;
    document.getElementById("precio").value = producto.price;
    document.getElementById("cantidad").value = producto.quantity;
    document.getElementById("descripcion").value = producto.description;

    this.productoEditandoId = id;
    document.getElementById("crear").textContent = "Actualizar";
  }

  static async entradaProducto(id) {
    const producto = await APIService.obtenerProductoPorId(id);
    producto.quantity += 1;
    await APIService.actualizarProducto(id, producto);
    this.listaProductos();
  }

  static async salidaProducto(id) {
    const producto = await APIService.obtenerProductoPorId(id);
    if (producto.quantity > 0) {
      producto.quantity -= 1;
      await APIService.actualizarProducto(id, producto);
      this.listaProductos();
    } else {
      alert("La cantidad ya es 0. No se puede disminuir más.");
    }
  }
}
