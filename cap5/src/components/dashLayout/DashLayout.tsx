import { Outlet } from "react-router-dom"
import DashHeader from "@components/dashHeader"

export default function DashLayout() {
  return (
    <>
      <DashHeader/>
      <div className="dash-container">
        <Outlet />
      </div>
    </>
  )
}
