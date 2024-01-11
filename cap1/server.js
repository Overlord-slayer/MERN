const express = require('express')
const path = require('path')

const app = express()

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

app.listen(PORT, () => console.log(`Ejecución del Servidor en el purto ${PORT}`))