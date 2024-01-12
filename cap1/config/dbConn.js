const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    // Hacer la conexión a la base de datos
    await mongoose.connect(process.env.DATABASE_URI)
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB