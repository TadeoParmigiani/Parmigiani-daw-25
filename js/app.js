var BASE_URL = "https://rickandmortyapi.com/api/character";

var grid = document.getElementById("card");
var mensaje = document.getElementById("mensaje");
var btnTodos = document.getElementById("btn-todos");
var form = document.getElementById("form-filtros");

// Función para mostrar personajes
function mostrarPersonajes(lista) {
  grid.innerHTML = "";

  if (lista.length === 0) {
    grid.textContent = "No se encontraron personajes.";
    return;
  }

  lista.forEach((personaje) => {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}">
      <h2>${personaje.name}</h2>
      <p>${personaje.status} - ${personaje.species}</p>
    `;
    grid.appendChild(card);
  });
}

// Función para mostrar mensaje
function mostrarMensaje(texto, esError = false) {
  mensaje.textContent = texto;
  mensaje.style.color = esError ? "red" : "";
}

// Traer todos los personajes 
async function traerPersonajes(url) {
  try {
    var personajes = [];
    var siguiente = url;

    while (siguiente) {
      var respuesta = await fetch(siguiente);
      var datos = await respuesta.json();
      personajes = personajes.concat(datos.results);
      siguiente = datos.info.next;
    }

    mostrarPersonajes(personajes);
    mostrarMensaje(""); 
  } catch (error) {
    mostrarPersonajes([]);
    mostrarMensaje("Hubo un error al traer los personajes.", true);
  }
}

// Construir URL con filtros
function construirUrlConFiltros(filtros) {
  var params = new URLSearchParams(filtros).toString();
  return `${BASE_URL}?${params}`;
}

// Evento mostrar todos
btnTodos.addEventListener("click", () => {
  traerPersonajes(BASE_URL);
});

// formulario con filtros
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var datos = new FormData(form);
  var filtros = {};

  datos.forEach((valor, clave) => {
    if (valor.trim()) {
      filtros[clave] = valor.trim();
    }
  });

  if (Object.keys(filtros).length === 0) {
    mostrarMensaje("Completá al menos un filtro o usá el botón 'Mostrar todos'");
    return;
  }

  var urlConFiltros = construirUrlConFiltros(filtros);
  traerPersonajes(urlConFiltros);
});
