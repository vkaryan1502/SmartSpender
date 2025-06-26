import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../api/auth'
import { useAuth } from '../context/authContext'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await registerUser(form)
      login(res.data) 
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-smoky flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-2">Create Account</h2>
        <p className="text-gray-600 mb-6">Join us and start managing your finances today</p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" onChange={handleChange} value={form.name} placeholder="Name" className="w-full border p-3 rounded" />
          <input name="email" onChange={handleChange} value={form.email} placeholder="Email" className="w-full border p-3 rounded" />
          <input name="password" type="password" onChange={handleChange} value={form.password} placeholder="Password" className="w-full border p-3 rounded" />
          <button className="w-full bg-primary text-white py-2 rounded">Register</button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account? <Link to="/login" className="text-primary">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
