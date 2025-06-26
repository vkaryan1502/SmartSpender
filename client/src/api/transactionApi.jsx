import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
export const updateTransaction = (id) => API.put('/transactions/:id')
export const deleteTransaction = (id, data) => API.delete('/transactions/:id', data)
