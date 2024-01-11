const { logEvents } = require('./logger')

// Middleware de manejo de errores para Express
const errorHandler = (err, req, res, next) => {
  // Registra información sobre el error en el archivo de registro
  logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLog.log')
  // Imprime el stack de error en la consola
  console.log(err.stack)

   // Determina el estado de la respuesta (status code)
  const status = res.statusCode ? res.statusCode : 500 // error del servidor
  // Establece el status code de la respuesta. Envía una respuesta JSON al cliente con un mensaje de error
  res.status(status).json({ error: err.message })
}

module.exports = errorHandler