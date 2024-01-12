// Carga y configura las variables de entorno desde un archivo .env utilizando dotenv
require('dotenv').config()

const express = require('express')
const path = require('path') // Para trabajar con rutas de archivos
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

const corsOptions = require('./config/corsOptions')

const connectDB = require('./config/dbConn')


const app = express()

// Conecta a la base de datos utilizando la función definida en './config/dbConn'
connectDB()

// Utiliza el middleware de registro definido en './middleware/logger'
app.use(logger)

// Habilita el middleware de CORS con configuración predeterminada
app.use(cors(corsOptions))

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json())

// Utiliza el middleware de cookies
app.use(cookieParser())

// Define el puerto en el que el servidor escuchará, usando el puerto proporcionado por el entorno o el puerto 3500 por defecto
const PORT = process.env.PORT || 3500

// Configura Express para servir archivos estáticos desde el directorio 'public' en la raíz del proyecto
app.use('/', express.static(path.join(__dirname, 'public'))) // no es necesario el /public, solo public basta

// Configura Express para usar las rutas definidas en el archivo './routes/root' cuando la solicitud está en la raíz ('/')
app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
  // Establece el código de estado de la respuesta HTTP a 404 (Not Found)
  res.status(404)

  // Verifica si el cliente acepta contenido en formato HTML
  if (req.accepts('html')) {
    // Si el cliente acepta HTML, envía el contenido del archivo '404.html
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    // Si el cliente no acepta HTML pero acepta JSON, envía una respuesta JSON con el mensaje '404 Not Found'
    res.json({ message: '404 Not Found' })
  } else {
    // Si el cliente no acepta ni HTML ni JSON, se asume que solo acepta texto y envía '404' como texto plano
    res.type('txt').send('404')
  }
})

// Utiliza el middleware de manejo de errores definido en './middleware/errorHandler'
app.use(errorHandler)

// Maneja el evento 'open' de la conexión a MongoDB
mongoose.connection.on('open', () => {
  console.log('Conectado a mongoDB')
  // Inicia el servidor Express una vez que la conexión a MongoDB está abierta
  app.listen(PORT, () => console.log(`Ejecución del Servidor en el purto ${PORT}`))
})

// Maneja el evento 'error' de la conexión a MongoDB
mongoose.connection.on('error', err => {
  console.log(err)
   // Registra el error en un archivo de registro utilizando la función definida en './middleware/logger'
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})