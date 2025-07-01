import { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from '../api/transactionApi'
import Navbar from '../components/Navbar'
import ChartSection from "../components/ChartSection";

function Dashboard() {
  const { user } = useAuth()
  console.log("Logged in user:", user)
  const displayName = user?.user?.name || user?.name || 'User'

  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    title: '',
    amount: '',
    type: 'income',
    date: new Date().toISOString().slice(0, 10),
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const txnData = {
      ...form,
      amount: parseFloat(form.amount),
    }

    try {
      if (editId) {
        const res = await updateTransaction(editId, txnData)
        setTransactions(
          transactions.map((t) => (t._id === editId ? res.data : t))
        )
        setEditId(null)
      } else {
        const res = await createTransaction(txnData)
        setTransactions([res.data, ...transactions])
      }

      setForm({
        title: '',
        amount: '',
        type: 'income',
        date: new Date().toISOString().slice(0, 10),
      })
    } catch (err) {
      console.error('Failed to submit transaction:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteTransaction(id)
      setTransactions(transactions.filter((txn) => txn._id !== id))
    } catch (err) {
      console.error('Failed to delete transaction:', err)
    }
  }

  const handleEdit = (txn) => {
    setEditId(txn._id)
    setForm({
      title: txn.title,
      amount: txn.amount,
      type: txn.type,
      date: txn.date?.slice(0, 10),
    })
  }

const fetchTransactions = async () => {
  try {
    const res = await getTransactions()
    console.log('✅ Transactions fetched:', res.data)
    setTransactions(res.data)
  } catch (err) {
    console.error('❌ Failed to fetch transactions:', err.response?.data || err.message)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    console.log('Current User:', user)
    if (user) {
      setTimeout(() => fetchTransactions(), 0)
    }
  }, [user])

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0)

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0)

  const balance = income - expense

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-smoky px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6">
            Welcome, {displayName} 👋
          </h1>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg text-gray-600">Total Income</h2>
              <p className="text-2xl font-bold text-success mt-2">₹{income}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg text-gray-600">Total Expense</h2>
              <p className="text-2xl font-bold text-error mt-2">₹{expense}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg text-gray-600">Balance</h2>
              <p
                className={`text-2xl font-bold ${balance >= 0 ? 'text-success' : 'text-error'
                  } mt-2`}
              >
                ₹{balance}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-xl font-semibold text-primary mb-4">
              {editId ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="border p-3 rounded"
                required
              />
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="border p-3 rounded"
                required
              />
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="border p-3 rounded"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border p-3 rounded"
              />
              <button className="md:col-span-2 bg-primary text-white py-2 rounded hover:bg-opacity-90">
                {editId ? 'Update Transaction' : 'Add Transaction'}
              </button>
            </form>
          </div>

          <ChartSection transactions={transactions} />

          {/* Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-primary mb-4">Recent Transactions</h2>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : transactions.length === 0 ? (
              <p className="text-gray-500">No transactions found.</p>
            ) : (
              <ul className="space-y-2">
                {transactions.map((txn) => (
                  <li
                    key={txn._id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">{txn.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(txn.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-semibold ${txn.type === 'income' ? 'text-success' : 'text-error'
                          }`}
                      >
                        {txn.type === 'income' ? '+' : '-'}₹{txn.amount}
                      </span>
                      <button
                        onClick={() => handleEdit(txn)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(txn._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
