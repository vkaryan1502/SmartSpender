import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../api/auth'
import { useAuth } from '../context/authContext'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await loginUser(form)
      login(res.data) // Save user + token
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-smoky flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
        <p className="text-gray-600 mb-6">Login to access your dashboard</p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" onChange={handleChange} value={form.email} placeholder="Email" className="w-full border p-3 rounded" />
          <input name="password" type="password" onChange={handleChange} value={form.password} placeholder="Password" className="w-full border p-3 rounded" />
          <button className="w-full bg-primary text-white py-2 rounded">Login</button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-primary">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
