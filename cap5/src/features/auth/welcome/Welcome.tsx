// Importar el componente Link de react-router-dom para crear enlaces en la aplicación
import { Link } from "react-router-dom"

function Welcome() {
   // Obtener la fecha actual y darle formato con la fecha y hora en estilo completo en inglés (en-US)
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long'}).format(date)

  const content = (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome!</h1>
      
      {/* Enlace a la ruta '/dash/notes' */}
      <p><Link to="/dash/notes">View techNotes</Link></p>
      
      {/* Enlace a la ruta '/dash/users' */}
      <p><Link to="/dash/users">View User Settings</Link></p>
    </section>
  )
  return content
}

export default Welcome