const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')

router.route('/')
  .get(usersController.getAllUsers) // Ruta para obtener todos los usuarios
  .post(usersController.createNewUser) // Ruta para crear un nuevo usuario
  .patch(usersController.updateUser) // Ruta para actualizar un usuario existente
  .delete(usersController.deleteUser) // Ruta para eliminar un usuario existente

module.exports = router