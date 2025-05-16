import InventarioApp from './inventarioApp.js';

document.addEventListener("DOMContentLoaded", async () => {
  // Obtengo idioma desde la URL o el navegador
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
    //Cada vez que se hace click invierto el valor de mostrando 
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

// Obtengo idioma de la URL o navegador
function getLang() {
  const params = new URLSearchParams(window.location.search);
  const paramLang = params.get('lang');
  const browserLang = navigator.language?.slice(0, 2).toLowerCase();
  return paramLang || (['es', 'en'].includes(browserLang) ? browserLang : 'en');
}


//Creo función para distinguir entre traducciones en inglés y en español 
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
