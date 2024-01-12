const mongoose = require('mongoose')

// Crea un nuevo esquema utilizando la clase mongoose.Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    default: "Employee"
  }],
  active: {
    type: Boolean,
    default: true
  },
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)