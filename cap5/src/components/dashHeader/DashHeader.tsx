import { Link } from "react-router-dom"

export default function DashHeader() {
  const content = (
    <header>
      <div>
        <Link to="/dash/notes">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* Agregar botones luego */}
        </nav>
      </div>
    </header>
  )

  return content
}
