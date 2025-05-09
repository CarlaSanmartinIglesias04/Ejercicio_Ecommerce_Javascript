export default class Utils {
  
  static sanitizeInput(str) {
    return str.replace(/<[^>]*>?/gm, '').trim();
  }

  static isSafeInput(str) {
    const pattern = /^[a-zA-Z0-9\s.,¡!¿?()'-]*$/;
    return pattern.test(str);
  }

  static limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("descripcion").value = "";
  }
}
