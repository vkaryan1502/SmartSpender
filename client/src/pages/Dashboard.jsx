import { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { createTransaction, getTransactions } from '../api/transactionApi'
import Navbar from '../components/Navbar'

function Dashboard() {
  const { user } = useAuth()
  const displayName = user?.user?.name || user?.name || 'User'

  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

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

    const newTxn = {
      ...form,
      amount: parseFloat(form.amount),
    }

    try {
      const res = await createTransaction(newTxn)
      setTransactions([res.data, ...transactions])
      setForm({
        title: '',
        amount: '',
        type: 'income',
        date: new Date().toISOString().slice(0, 10),
      })
    } catch (err) {
      console.error('Failed to add transaction:', err)
    }
  }

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions()
      setTransactions(res.data)
    } catch (err) {
      console.error('Failed to fetch transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Only fetch if user is ready
  useEffect(() => {
    if (user) fetchTransactions()
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
                className={`text-2xl font-bold ${
                  balance >= 0 ? 'text-success' : 'text-error'
                } mt-2`}
              >
                ₹{balance}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-xl font-semibold text-primary mb-4">Add Transaction</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Add Transaction
              </button>
            </form>
          </div>

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
                    <span
                      className={`font-semibold ${
                        txn.type === 'income' ? 'text-success' : 'text-error'
                      }`}
                    >
                      {txn.type === 'income' ? '+' : '-'}₹{txn.amount}
                    </span>
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
