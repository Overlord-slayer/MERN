const allowedOrigins = require('./allowedOrigins')

// Configura opciones para el middleware de CORS en Express
const corsOptions = {
  // Función que verifica si el origen de la solicitud está en la lista de orígenes permitidos
  origin: (origin,  callback) => {
    // Verifica si el origen está en la lista de orígenes permitidos o si no se proporciona ningún origen
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Llama a la función de callback con null (sin error) y true (permite la solicitud)
      callback(null, true)
    } else {
      // Llama a la función de callback con un error indicando que no está permitido por CORS
      callback(new Error('No permitido por CORS'))
    }
  },
  // Habilita el intercambio de cookies y credenciales de autenticación en solicitudes de origen cruzado
  credentials: true,
  // Establece el código de estado de las respuestas preflight OPTIONS exitosas
  optionsSuccessStatus: 200
}

module.exports = corsOptions