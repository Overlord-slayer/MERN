const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  // Utiliza el modelo User para buscar todos los usuarios en la base de datos
  const users = await User.find().select('-password').lean()
    // Verifica si no se encontraron usuarios
    if (!users?.length) {
      // En caso de no encontrar usuarios, responde con un código de estado 400 y un mensaje
      return res.status(400).json({ message: "No se encontró el usuario" });
    }
 // Responde con la lista de usuarios obtenidos de la base de datos
  res.json(users)
})

// @desc Create new users
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body

  // Confirmar datos, para no tener campos vacíos
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "Todos los campos son requeridos" })
  }

  // Verificar por valores repetidos en la base de datos
  const duplicate = await User.findOne({ username }).lean().exec()

  // Si se encuentra un usuario con el mismo nombre, responde con un código de estado 400 y un mensaje
  if (duplicate) {
    return res.status(400).json({ message: "Usuario ya existente" })
  }

  // Encriptar la contraseña antes de almacenarla en la base de datos
  const hashedPwd = await bcrypt.hash(password, 10) // Tamño de la encrpiptacion = 10

  // Crear un objeto de usuario con la información proporcionada
  const userObject = { username, "password": hashedPwd, roles }

  // Crear y almacenar el nuevo usuario en la base de datos
  const user = await User.create(userObject)
  if (user) { // Usuario creado exitosamente
    res.status(201).json({ message: `Usuario: ${username}, creado`})
  } else {
    // Si hay algún problema con la creación del usuario, responde con un código de estado 400 y un mensaje
    res.status(400).json({ message: 'Datos inválidos de usuario' })
  }
  
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { id, username, roles, active, password } = req.body

  // Validar campos requerido
  if (!id || !username || !Array.isArray(roles) 
    || !roles.length || typeof active !== 'boolean') {
      return res.status(400).json({ message: "Todos los campos son requeridos" })
  }

   // Buscar el usuario por su identificador
  const user = await User.findById(id).exec()

  // Verificar si el usuario existe
  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" })
  }

  // Verificar duplicados en el nombre de usuario
  const duplicate = await User.findOne({ username }).lean().exec()

  // Permitir la actualización para el usuario original
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Nombre de usuario duplicado" })
  }

  // Actualizar propiedades del usuario
  user.username = username
  user.roles = roles
  user.active = active

  // Verificar si se proporcionó una nueva contraseña
  if (password) {
    // Encriptar la nueva contraseña antes de almacenarla
    user.password = await bcrypt.hash(password, 10) // El valor '10' representa el costo de encriptación
  }

  // Guardar el usuario actualizado en la base de datos
  const updatedUser = await user.save()

  // Responder con un mensaje indicando la actualización exitosa
  res.json({ message: `${updatedUser.username} actualizado`})
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  // Extraer el ID del usuario del cuerpo de la solicitud
  const { id } = req.body

  // Validar que se proporcionó el ID del usuario
  if (!id) {
    return res.status(400).json({ message: "Id de usuario requerido" })
  }

  // Buscar notas asociadas al usuario
  const note = await Note.findOne({ user: id }).lean().exec()
  if (note) {
    // En caso de tener notas asignadas, no se puede eliminar
    return res.status(400).json({ message: "El usuario tiene notas asigandas" })
  }

  // Buscar el usuario por su identificador
  const user = await User.findById(id).exec()

  // Verificar si el usuario existe
  if (!user){
    return res.status(400).json({ message: "Usuario no encontrado" })
  }

  const deletedUsername = user.username

  // Eliminar el usuario de la base de datos
  await user.deleteOne()

  // Crear un mensaje de respuesta indicando que el usuario fue eliminado
  const reply = {
  message: `Usuario: ${deletedUsername} con ID ${id} eliminado`
}

  // Responder con el mensaje de eliminación exitosa
  res.json(reply)
})

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser
}
