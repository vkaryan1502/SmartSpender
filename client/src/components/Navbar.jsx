import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function Navbar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">SmartSpender</h1>

      {user && (
        <div className="flex gap-4 items-center">
          <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium">
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
