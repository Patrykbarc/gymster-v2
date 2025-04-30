import { Outlet } from 'react-router'

export default function DashboardLayout() {
  return (
    <div>
      <p>Dashboard Layout</p>
      <Outlet />
    </div>
  )
}
