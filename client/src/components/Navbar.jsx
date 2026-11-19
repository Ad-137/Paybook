import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium ${
    isActive ? 'bg-brand/15 text-brand' : 'text-muted hover:text-white'
  }`

export default function Navbar() {
  const { logout } = useAuth()

  return (
    <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-5">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <span className="font-display text-2xl font-bold">PayBook</span>
        <nav className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </nav>
      </div>

      <button
        onClick={logout}
        className="h-11 rounded-full border border-white/20 px-5 text-sm font-semibold hover:border-brand"
      >
        Log out
      </button>
    </header>
  )
}