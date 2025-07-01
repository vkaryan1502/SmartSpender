import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <Link to="/" className="text-xl font-bold text-primary">
        SmartSpender
      </Link>

      <div className="hidden md:flex gap-6 text-gray-700">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Right: Auth Button */}
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-primary text-white px-4 py-1 rounded hover:bg-opacity-90"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
