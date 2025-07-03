import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})


API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = user?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const createTransaction = (data) => API.post('/transactions', data)
export const getTransactions = () => API.get('/transactions')
export const updateTransaction = (id, data) => API.put(`/transactions/${id}`, data)
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`)
