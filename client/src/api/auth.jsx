import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
})

export const registerUser = (formData) => API.post('/auth/register', formData)
export const loginUser = (formData) => API.post('/auth/login', formData)
