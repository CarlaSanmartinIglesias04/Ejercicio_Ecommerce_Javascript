const API_URL = "https://inventario-bhkd.api.codehooks.io/dev/productos";
const HEADERS = {
  'x-apikey': '5e46d7f9-9dbc-454b-b38c-348777183597',
  'Content-Type': 'application/json'
};

export class APIService {
  static async verificarConexion() {
    try {
      const response = await fetch(API_URL, { method: "GET", headers: HEADERS });
      return response.ok;
    } catch (error) {
      console.error("Error de conexión con la API:", error);
      return false;
    }
  }

  static async obtenerProductoPorId(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: "GET", headers: HEADERS });
    return await response.json();
  }

  static async actualizarProducto(id, data) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify(data)
    });
  }

  static async crearProducto(data) {
    await fetch(API_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(data)
    });
  }

  static async eliminarProducto(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: HEADERS });
  }

  static async obtenerProductos() {
    const response = await fetch(API_URL, { method: "GET", headers: HEADERS });
    return await response.json();
  }
}
