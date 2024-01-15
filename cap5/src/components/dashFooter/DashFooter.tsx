import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from "react-router-dom"


export default function DashFooter() {
  // Obtener la función de navegación y la ruta actual mediante React Router hooks
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Función que redirige a la ruta '/dash' al hacer clic en el botón de regreso a casa
  const onGoHomeClicked = () => navigate('/dash')

  // Inicializar la variable goHomeButton como null
  let goHomeButton = null
  // Condición: renderizar el botón solo si la ruta actual no es '/dash'
  if (pathname !== '/dash') {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>

    )
  }

  const content = (
    <footer className="dash-footer">
      {goHomeButton} {/* Renderizar el botón de regreso a casa si está definido */}
      <p>Current User:</p>
      <p>Status: </p>
    </footer>
  )
  return content
}
