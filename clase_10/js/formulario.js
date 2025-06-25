var campos = [
  "nombre", "email", "contrasena", "repetir",
  "edad", "telefono", "direccion", "ciudad",
  "codigoPostal", "dni"
]

// Cargar datos del LocalStorage 
window.onload = function() {
  var datosGuardados = localStorage.getItem('datosFormulario');
  if (datosGuardados) {
    var datos = JSON.parse(datosGuardados);
    campos.forEach(campo => {
        var input = document.getElementById(campo);
        if (datos[campo] && input) {
          input.value = datos[campo];
        }
    });
    actualizarTitulo(); 
  }
}

// Asignar eventos a cada campo
campos.forEach(campo => {
  var input = document.getElementById(campo)

  input.addEventListener("blur", () => {
    var mensaje = validarCampo(campo, input.value)
    mostrarError(campo, mensaje)
  })

  input.addEventListener("focus", () => {
    mostrarError(campo, "")
  })
})

// Validar 
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault()
  var errores = []
  var datosFormulario = {}

  campos.forEach(campo => {
    var input = document.getElementById(campo)
    var mensaje = validarCampo(campo, input.value)
    if (mensaje) {
      mostrarError(campo, mensaje)
      errores.push(`${campo}: ${mensaje}`)
    } else {
      datosFormulario[campo] = input.value
    }
  })

  if (errores.length === 0) {
    enviarDatos(datosFormulario)
  } else {
    alert("Errores en el formulario:\n\n" + errores.join("\n"))
  }
})

// Función para enviar datos al servidor
function enviarDatos(datos) {
  
  var baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  var params = new URLSearchParams();
  
  // Agregar todos los datos como parámetros
  Object.keys(datos).forEach(key => {
    params.append(key, datos[key]);
  });
  
  var urlCompleta = `${baseUrl}?${params.toString()}`;
  
  // Realizar la petición 
  fetch(urlCompleta, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
  })
  .then(data => {
    manejarExito(data, datos);
  })
  .catch(error => {
    manejarError(error);
  });
}
function formatearClaves(datos) {
  const map = {
    nombre: "name",
    email: "email",
    contrasena: "password",
    repetir: "confirmPassword",
    edad: "age",
    telefono: "telephone",
    direccion: "address",
    ciudad: "city",
    codigoPostal: "postalcode",
    dni: "dni"
  };

  const nuevo = {};
  for (let clave in datos) {
    nuevo[map[clave] || clave] = datos[clave];
  }
  return nuevo;
}
// Función para manejar el éxito del envío
function manejarExito(respuestaServidor, datosOriginales) {

  localStorage.setItem('datosFormulario', JSON.stringify(datosOriginales));
  
  var mensaje = `
    <h3>Successfull Subscription! :)</h3>
    <pre style="text-align: left;">${JSON.stringify(formatearClaves(datosOriginales), null, 2)}</pre>
  `;
  
  mostrarModal(mensaje);
}

// Función para manejar errores del envío
function manejarError(error) {
  var mensaje = `
    <h3>subscription error</h3>
    <p>Ha ocurrido un error al enviar los datos:</p>
    <div class="error-details">
      <p><strong>Error:</strong> ${error.message}</p>
    </div>
    <p>Por favor, intenta nuevamente más tarde.</p>
  `;
  
  mostrarModal(mensaje);
}

// Mostrar u ocultar el mensaje de error
function mostrarError(campo, mensaje) {
  document.getElementById(`error-${campo}`).textContent = mensaje
}

// Validaciones 
function validarCampo(campo, valor) {
  valor = valor.trim()

  switch (campo) {
    case "nombre":
      if (valor.length < 6 || !valor.includes(" ")) {
        return "Debe tener más de 6 letras y al menos un espacio."
      }
      break

    case "email":
      if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(valor)) {
        return "Email inválido."
      }
      break

    case "contrasena":
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valor)) {
        return "Al menos 8 caracteres con letras y números."
      }
      break

    case "repetir":
      const original = document.getElementById("contrasena").value;
      if (valor !== original) {
        return "Las contraseñas no coinciden."
      }
      break

    case "edad":
      if (!/^\d+$/.test(valor) || parseInt(valor) < 18) {
        return "Debés ser mayor de 18."
      }
      break

    case "telefono":
      if (!/^\d{7,}$/.test(valor)) {
        return "Debe tener al menos 7 dígitos sin espacios ni símbolos.";
      }
      break

    case "direccion":
      if (valor.length < 5 || !/\d/.test(valor) || !/[A-Za-z]/.test(valor) || !valor.includes(" ")) {
        return "Debe tener letras, números y un espacio."
      }
      break;

    case "ciudad":
      if (valor.length < 3) {
        return "Debe tener al menos 3 caracteres."
      }
      break

    case "codigoPostal":
      if (valor.length < 3) {
        return "Debe tener al menos 3 caracteres."
      }
      break

    case "dni":
      if (!/^\d{7,8}$/.test(valor)) {
        return "Debe tener 7 u 8 dígitos."
      }
      break
  }

  return ""
}

var inputNombre = document.getElementById("nombre");
var tituloForm = document.getElementById("titulo-form");

function actualizarTitulo() {
  var valor = inputNombre.value.trim();
  if (valor) {
    tituloForm.textContent = "HOLA " + valor.toUpperCase();
  } else {
    tituloForm.textContent = "HOLA"
  }
}

// Actualiza cuando escribe y cuando entra al campo
inputNombre.addEventListener("keydown", () => {
  setTimeout(actualizarTitulo, 10);
});
inputNombre.addEventListener("input", actualizarTitulo);
inputNombre.addEventListener("focus", actualizarTitulo);

document.getElementById('cerrar').addEventListener('click', () => {
  document.getElementById('modal').classList.add('oculto');
  document.getElementById('modal').classList.remove('mostrar');
});

// Función para mostrar 
function mostrarModal(mensaje) {
  document.getElementById('mensaje').innerHTML = mensaje;
  document.getElementById('modal').classList.remove('oculto');
  document.getElementById('modal').classList.add('mostrar');

}

// Función para ocultar 
document.getElementById('cerrar').onclick = function() {
document.getElementById('modal').classList.add('oculto');
document.getElementById('modal').classList.remove('mostrar');

};