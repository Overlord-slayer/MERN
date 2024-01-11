const { format } = require('date-fns') // Para formatear fechas
const { v4: uuid } = require('uuid') // Para generar identificadores únicos
const fs = require('fs') // Para operaciones de sistema de archivos
const fsPromises = require('fs').promises // Promesas para operaciones de sistema de archivos
const path = require('path') // Para trabajar con rutas de archivos

// Función asincrónica para registrar eventos en un archivo de registro
const logEvents = async (message, logFileName) => {
  // Obtiene la fecha y hora formateada
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
  // Crea un registro con fecha, identificador único (uuid) y mensaje
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    // Verifica si el directorio 'logs' existe, y si no, lo crea
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    // Añade el registro al archivo de registro especificado
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
  } catch (error) {
    console.log(error)
  }
}

// Middleware de registro para Express
const logger = (req, res, next) => {
  // Registra información sobre la solicitud actual
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
  console.log(`${req.method} ${req.path}`)
  next()
}

module.exports = { logEvents, logger }