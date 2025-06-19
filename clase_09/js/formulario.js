const campos = [
  "nombre", "email", "contrasena", "repetir",
  "edad", "telefono", "direccion", "ciudad",
  "codigoPostal", "dni"
]

// Asignar eventos a cada campo
campos.forEach(campo => {
  const input = document.getElementById(campo)

  input.addEventListener("blur", () => {
    const mensaje = validarCampo(campo, input.value)
    mostrarError(campo, mensaje)
  })

  input.addEventListener("focus", () => {
    mostrarError(campo, "")
  })
})

// Validar todos los campos al enviar
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault()
  let errores = []
  let datos = []

  campos.forEach(campo => {
    const input = document.getElementById(campo)
    const mensaje = validarCampo(campo, input.value)
    if (mensaje) {
      mostrarError(campo, mensaje)
      errores.push(`${campo}: ${mensaje}`)
    } else {
      datos.push(`${campo}: ${input.value}`)
    }
  })

  if (errores.length === 0) {
    alert("Formulario enviado correctamente:\n\n" + datos.join("\n"))
  } else {
    alert("Errores en el formulario:\n\n" + errores.join("\n"))
  }
})

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

const inputNombre = document.getElementById("nombre");
const tituloForm = document.getElementById("titulo-form");

function actualizarTitulo() {
  const valor = inputNombre.value.trim();
  if (valor) {
    tituloForm.textContent = "HOLA " + valor.toUpperCase();
  } else {
    tituloForm.textContent = "HOLA"
  }
}

