
document.addEventListener("DOMContentLoaded", () => {

  const loginDiv = document.getElementById("login");

  const usuarioGuardado = localStorage.getItem("usuario");

  if (usuarioGuardado) {
    window.location.href = "/index"; 
  }

  document.getElementById("btnLogin").addEventListener("click", () => {
    const usuario = document.getElementById("usuario").value.trim();
    const clave = document.getElementById("clave").value.trim();

    if (usuario && clave) {

      localStorage.setItem("usuario", usuario);
      
      alert("¡Has iniciado sesión con éxito!")
      window.location.href = "/index"; 
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });
});
