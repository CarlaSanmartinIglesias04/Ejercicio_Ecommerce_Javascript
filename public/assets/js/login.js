document.getElementById("btnLogin").addEventListener("click", async () => {
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();

  if (usuario && clave) {
    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, clave })
      });

      if (res.ok) {
        alert("¡Has iniciado sesión con éxito!");
        window.location.href = "/index";
      } else {
        alert("Usuario o clave incorrectos.");
      }
    } catch (error) {
      alert("Error al conectar con el servidor.");
    }
  } else {
    alert("Por favor, completa todos los campos.");
  }
});
