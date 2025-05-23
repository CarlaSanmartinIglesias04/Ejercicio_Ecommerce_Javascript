import InventarioApp from './inventarioApp.js';

document.addEventListener("DOMContentLoaded", async () => {
  // Obtengo idioma desde la URL, cookie o navegador
  const lang = getLang();

  // Cargo archivo JSON con las traducciones
  const traduccionesJson = await fetch('/assets/languages/textos.json')
    .then(res => res.json())
    .catch(err => {
      console.error("Error al cargar textos.json", err);
      return {};
    });

  // Uso traduccionesJson y lang para obtener el objeto traducciones correcto
  const t = getTraducciones(traduccionesJson, lang);

  // Le paso todas las traducciones a la clase InventarioApp
  InventarioApp.setTraducciones(t);

  // Botón crear/actualizar
  document.getElementById("crear").textContent = t.create;
  document.getElementById("crear").addEventListener("click", () => {
    InventarioApp.crearOActualizarProducto();
  });

  // Botón mostrar/ocultar productos
  const botonMostrar = document.getElementById("mostrar");
  const lista = document.getElementById("listaProductos");
  let mostrando = false;

  botonMostrar.addEventListener("click", async () => {
    mostrando = !mostrando;

    if (mostrando) {
      botonMostrar.textContent = t.hideProducts;
      await InventarioApp.listaProductos();
    } else {
      botonMostrar.textContent = t.showProducts;
      lista.textContent = "";
    }
  });
});



// Guardar modal de editar
document.getElementById("modal-guardar").addEventListener("click", () => {
  InventarioApp.guardarEdicionDesdeModal();
});

// Cerrar modal
document.getElementById("modal-cerrar").addEventListener("click", () => {
  document.getElementById("modalEditar").classList.add("hidden");
  InventarioApp.productoEditandoId = null;
});




// FUNCIONES DE IDIOMA

// Obtengo idioma desde parámetro, cookie o navegador
function getLang() {
  const params = new URLSearchParams(window.location.search);
  const paramLang = params.get('lang');
  const cookieLang = getCookie('lang');
  const browserLang = navigator.language?.slice(0, 2).toLowerCase();

  const lang = paramLang || cookieLang || (['es', 'en'].includes(browserLang) ? browserLang : 'en');

  // Guardo la cookie si viene por parámetro o navegador
  if (paramLang || !cookieLang) {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`; // 1 año
  }

  return lang;
}

// Leer valor de una cookie por nombre
function getCookie(nombre) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === nombre) return value;
  }
  return null;
}

// Selecciono traducciones del archivo según el idioma
function getTraducciones(trads, lang) {
  const traducciones = {};
  for (const key in trads) {
    if (lang === 'es' || !trads.hasOwnProperty(key + '_en')) {
      traducciones[key] = trads[key];
    } else if (lang === 'en' && trads.hasOwnProperty(key + '_en')) {
      traducciones[key] = trads[key + '_en'];
    }
  }
  return traducciones;
}
