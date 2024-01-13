import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from "react-router-dom"


export default function DashFooter() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onGoHomeClicked = () => navigate('/dash')

  let goHomeButton = null

  const content = (
    <footer className="dash-footer">
      <p>Current User:</p>
      <p>Status: </p>
    </footer>
  )
  return content
}
