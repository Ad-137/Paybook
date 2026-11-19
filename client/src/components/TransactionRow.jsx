export default function TransactionRow({ transaction, onEdit, onDelete }) {
  const { note, category, date, amount, type } = transaction
  const isIncome = type === 'income'

  const title = note || category || (isIncome ? 'Income' : 'Expense')
  const shortDate = new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
  })

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 py-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand/25 bg-brand/10 font-semibold text-brand">
        {title[0].toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{title}</p>
        <p className="text-sm text-muted">
          {category || 'Uncategorized'} · {shortDate}
        </p>
      </div>

      <p className={`font-display font-bold ${isIncome ? 'text-brand' : 'text-expense'}`}>
        {isIncome ? '+' : '−'} ₹ {amount.toLocaleString('en-IN')}
      </p>

      <div className="flex w-full justify-end sm:w-auto">
        <button
          onClick={() => onEdit(transaction)}
          aria-label={`Edit ${title}`}
          className="h-11 min-w-11 rounded-lg px-3 text-sm text-muted hover:text-white"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(transaction._id)}
          aria-label={`Delete ${title}`}
          className="h-11 min-w-11 rounded-lg px-3 text-sm text-expense"
        >
          Delete
        </button>
      </div>
    </div>
  )
}