// Importar el componente Outlet de react-router-dom, que sirve como punto de salida para el enrutamiento anidado
import { Outlet } from "react-router-dom"
import DashHeader from "@components/dashHeader"
import DashFooter from "@components/dashFooter"

export default function DashLayout() {
  return (
    <>
      <DashHeader/>
      {/* Contenedor principal del panel de control */}
      <div className="dash-container">
        {/* Outlet: punto de salida para el enrutamiento anidado.
            Aquí se renderizarán los componentes hijos según la ruta actual */}
        <Outlet />
      </div>
      <DashFooter/>
    </>
  )
}
