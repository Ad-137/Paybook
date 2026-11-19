import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import SummaryCard from '../components/SummaryCard'
import CategoryBreakdown from '../components/CategoryBreakdown'
import TransactionList from '../components/TransactionList'
import AddTransactionForm from '../components/AddTransactionForm'

export default function Dashboard() {
  const { user } = useAuth()

  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [listRes, summaryRes] = await Promise.all([
          api.get('/transactions'),
          api.get('/transactions/summary'),
        ])

        setTransactions(Array.isArray(listRes.data) ? listRes.data : listRes.data.transactions || [])
        setSummary(summaryRes.data)
        setError('')
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [reload])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return

    try {
      await api.delete(`/transactions/${id}`)
      if (editing?._id === id) setEditing(null)
      setReload((r) => r + 1)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  const handleSaved = () => {
    setEditing(null)
    setReload((r) => r + 1)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Welcome back, <span className="text-brand">{user?.Name}</span>
        </h1>
        <p className="mt-2 text-muted">Here is where your money stands this month.</p>

        {error && (
          <p className="mt-6 rounded-lg bg-expense/10 px-3 py-2 text-sm text-expense">{error}</p>
        )}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Balance"
            amount={summary.balance}
            color={summary.balance >= 0 ? 'text-brand' : 'text-expense'}
          />
          <SummaryCard label="Income" amount={summary.totalIncome} color="text-brand" />
          <SummaryCard label="Expenses" amount={summary.totalExpense} color="text-expense" />
        </section>

        <section className="mt-8">
          <CategoryBreakdown transactions={transactions} />
        </section>

        <section className="mt-8 grid items-start gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {loading ? (
              <p className="text-muted">Loading transactions...</p>
            ) : (
              <TransactionList
                transactions={transactions}
                onEdit={setEditing}
                onDelete={handleDelete}
              />
            )}
          </div>

          <AddTransactionForm
            key={editing?._id || 'new'}
            editing={editing}
            onSaved={handleSaved}
            onCancel={() => setEditing(null)}
          />
        </section>
      </main>
    </div>
  )
}