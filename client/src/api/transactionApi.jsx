import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// Include token in header
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = user?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const createTransaction = (data) => API.post('/transactions/add', data)
export const getTransactions = () => API.get('/transactions/:userId')
