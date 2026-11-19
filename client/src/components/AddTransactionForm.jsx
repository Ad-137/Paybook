import { useState } from 'react'
import api from '../api/axios'

const inputClass =
  'h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-white outline-none focus:border-brand'

export default function AddTransactionForm({ editing, onSaved, onCancel }) {
  const [type, setType] = useState(editing?.type || 'expense')
  const [amount, setAmount] = useState(editing ? String(editing.amount) : '')
  const [category, setCategory] = useState(editing?.category || '')
  const [note, setNote] = useState(editing?.note || '')
  const [date, setDate] = useState(editing ? editing.date.slice(0, 10) : '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const body = { type, amount: Number(amount), category, note }
    if (date) body.date = date

    try {
      if (editing) {
        await api.put(`/transactions/${editing._id}`, body)
      } else {
        await api.post('/transactions', body)
        setAmount('')
        setCategory('')
        setNote('')
        setDate('')
      }
      onSaved()
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <h2 className="font-display text-lg font-bold">
        {editing ? 'Edit transaction' : 'New transaction'}
      </h2>

      <div className="flex gap-1 rounded-full bg-white/5 p-1">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`h-11 flex-1 rounded-full text-sm font-semibold ${
            type === 'expense' ? 'bg-expense text-ink' : 'text-muted'
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`h-11 flex-1 rounded-full text-sm font-semibold ${
            type === 'income' ? 'bg-brand text-ink' : 'text-muted'
          }`}
        >
          Income
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-expense/10 px-3 py-2 text-sm text-expense">{error}</p>
      )}

      <label className="flex flex-col gap-1 text-sm text-muted">
        Amount (₹)
        <input
          type="number"
          required
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Note
        <input
          type="text"
          placeholder="e.g. Lunch with friends"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Category
        <input
          type="text"
          list="categories"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        />
        <datalist id="categories">
          <option value="Food" />
          <option value="Travel" />
          <option value="Education" />
          <option value="Entertainment" />
          <option value="Allowance" />
          <option value="Other"  />
        </datalist>
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted">
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`${inputClass} scheme-dark`}
        />
      </label>

      <button
        type="submit"
        disabled={saving}
        className="h-12 rounded-full bg-brand font-semibold text-ink disabled:opacity-60"
      >
        {saving ? 'Saving...' : editing ? 'Update transaction' : 'Save transaction'}
      </button>

      {editing && (
        <button
          type="button"
          onClick={onCancel}
          className="h-12 rounded-full border border-white/20 font-semibold"
        >
          Cancel
        </button>
      )}
    </form>
  )
}