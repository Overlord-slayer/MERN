const express = require('express')
const path = require('path')
const router = express.Router()

// Maneja las solicitudes GET para rutas que coinciden con el patrón '^/$' o '/index' seguido opcionalmente de '.html'
router.get('^/$|/index(.html)?', (req, res) => {
  // Responde enviando un archivo al cliente
  // Se utiliza 'path.join' para construir la ruta completa del archivo 'index.html'
  res.sendFile(path.join(__dirname,'..', 'views', 'index.html'))
})

module.exports = router