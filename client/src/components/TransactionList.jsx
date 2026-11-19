import { useState } from 'react'
import TransactionRow from './TransactionRow'

const filters = ['all', 'income', 'expense']

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const [filter, setFilter] = useState('all')

  const visible =
    filter === 'all'
      ? transactions
      : transactions.filter((t) => t.type === filter)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold">Recent transactions</h2>

        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`h-10 rounded-full px-4 text-sm font-semibold capitalize ${filter === f
                  ? 'bg-brand/15 text-brand'
                  : 'border border-white/10 text-muted'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 && (
        <p className="py-6 text-muted">
          {filter === 'all'
            ? 'No transactions yet. Add your first one using the form.'
            : `No ${filter} transactions.`}
        </p>
      )}
      {visible.map((t) => (
        <TransactionRow key={t._id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
      ))}

    </div>
  )
}