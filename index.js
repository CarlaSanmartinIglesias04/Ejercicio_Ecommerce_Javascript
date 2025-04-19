const API_URL = "https://inventario-bhkd.api.codehooks.io/dev/productos";
const HEADERS = {
  'x-apikey': '5e46d7f9-9dbc-454b-b38c-348777183597',
  'Content-Type': 'application/json'
};

async function verificarConexionAPI() {

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: HEADERS,
    });

    return response.ok; 
    //Esto tuve que ver como hacerlo
  } catch (error) {
    console.error("Error de conexión con la API:", error);
    return false; 
  }
}


// Validaciones de formulario para que no haya inyecciones de código (las copié de por ahi)
function sanitizeInput(str) {
  return str.replace(/<[^>]*>?/gm, '').trim();
}

function isSafeInput(str) {
  const pattern = /^[a-zA-Z0-9\s.,¡!¿?()'-]*$/;
  return pattern.test(str);
}

// Funciones usadas por varios métodos
async function obtenerProductoPorId(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: HEADERS,
  });
  return await response.json();
}

async function actualizarProducto(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(data)
  });
}

async function crearProducto() {
  const producto = {
    name: sanitizeInput(document.getElementById("nombre").value),
    price: parseFloat(document.getElementById("precio").value),
    quantity: parseInt(document.getElementById("cantidad").value),
    description: sanitizeInput(document.getElementById("descripcion").value)
  };

  if (!isSafeInput(producto.name) || !isSafeInput(producto.description)) {
    alert("Por favor, evita caracteres especiales en el nombre o descripción.");
    return;
  }

  if (producto.price <= 0 || producto.quantity < 0) {
    alert("El precio y la cantidad deben ser números positivos.");
    return;
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(producto)
  });

  alert("Producto creado con éxito!");
  limpiarFormulario();
  listaProductos();
}

async function listaProductos() {
  const contenedor = document.getElementById("listaProductos");
  contenedor.innerHTML = "<p>Cargando...</p>"; 

  const conectado = await verificarConexionAPI();

  if (!conectado) {
    contenedor.innerHTML = "<p style='color:red;'>No se pudo conectar con la API.</p>";
    return;
  }

  const response = await fetch(API_URL, {
    method: "GET",
    headers: HEADERS,
  });

  const data = await response.json();
  contenedor.innerHTML = ""; 

  data.forEach(element => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${element.name}</h3>
      <p><strong>Precio:</strong> ${element.price}</p>
      <p><strong>Cantidad:</strong> ${element.quantity}</p>
      <p><strong>Descripción:</strong> ${element.description}</p>
      <button onclick="entradaProducto('${element._id}')">Entrada</button>
      <button onclick="salidaProducto('${element._id}')">Salida</button>
      <button onclick="editarProducto('${element._id}')">Editar</button>
      <button onclick="eliminarProducto('${element._id}')">Eliminar</button>
      <hr/>
    `;
//Se puede hacer tb solo con innerHtml+=
    contenedor.appendChild(card);
  });
}

async function eliminarProducto(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: HEADERS
  });

  listaProductos();
}


//Tb creo q podria usar un bool que cambie de valor si se está creando un producto nuevo o si se ha presionado el boton de editar
let productoEditandoId = null;

async function editarProducto(id) {
  const data = await obtenerProductoPorId(id);

  document.getElementById("nombre").value = data.name;
  document.getElementById("precio").value = parseFloat(data.price);
  document.getElementById("cantidad").value = parseInt(data.quantity);
  document.getElementById("descripcion").value = data.description;

  productoEditandoId = id;

  const btnCrear = document.getElementById("crear");
  btnCrear.textContent = "Actualizar";

  btnCrear.onclick = async () => {
    const producto = {
      name: sanitizeInput(document.getElementById("nombre").value),
      price: parseFloat(document.getElementById("precio").value),
      quantity: parseInt(document.getElementById("cantidad").value),
      description: sanitizeInput(document.getElementById("descripcion").value)
    };

    if (!isSafeInput(producto.name) || !isSafeInput(producto.description)) {
      alert("Por favor, evita caracteres especiales en el nombre o descripción.");
      return;
    }

    if (producto.price <= 0 || producto.quantity < 0) {
      alert("El precio y la cantidad deben ser números positivos.");
      return;
    }

    actualizarProducto(productoEditandoId, producto);

    alert("Producto actualizado con éxito!");
    limpiarFormulario();

    btnCrear.textContent = "Crear";
    productoEditandoId = null;

    listaProductos();
  };
}

async function entradaProducto(id) {
  const data = await obtenerProductoPorId(id);
  data.quantity += 1;

  actualizarProducto(id, data);
  listaProductos();
}

async function salidaProducto(id) {
  const data = await obtenerProductoPorId(id);

  if (data.quantity > 0) {
    data.quantity -= 1;
    actualizarProducto(id, data);
    listaProductos();
  } else {
    alert("La cantidad ya es 0. No se puede disminuir más.");
  }
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("descripcion").value = "";
}
