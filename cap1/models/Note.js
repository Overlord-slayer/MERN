const mongoose = require('mongoose')
// Importa el paquete 'mongoose-sequence' y lo utiliza para agregar funcionalidad de autoincremento
const AutoIncrement = require('mongoose-sequence')(mongoose)

// Crea un nuevo esquema utilizando la clase mongoose.Schema
const noteSchema = new mongoose.Schema(
  {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  },
  {
    timestamps: true // obtner la fecha, tanto de actualizacion como de creacion
  }
)

// Plugin 'mongoose-sequence' para agregar funcionalidad de autoincremento al esquema
noteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket', // Campo que se autoincrementará
  id: 'ticketNums', // Identificador único para el contador de autoincremento
  start_seq: 500 // Valor inicial del contador de autoincremento
})

module.exports = mongoose.models.Note || mongoose.model('Note', noteSchema)