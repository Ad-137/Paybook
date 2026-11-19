export default function CategoryBreakdown({ transactions }) {
  const expenses = transactions.filter((t) => t.type === 'expense')
  const total = expenses.reduce((sum, t) => sum + t.amount, 0)

  const totals = {}
  expenses.forEach((t) => {
    const name = t.category || 'Uncategorized'
    totals[name] = (totals[name] || 0) + t.amount
  })

  const rows = Object.entries(totals).sort((a, b) => b[1] - a[1])

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="font-display text-lg font-bold">Spending by category</h2>

      {rows.length === 0 && <p className="mt-4 text-muted">No expenses yet.</p>}

      <div className="mt-5 flex flex-col gap-5">
        {rows.map(([name, amount]) => {
          const percent = Math.round((amount / total) * 100)

          return (
            <div key={name}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold">{name}</span>
                <span className="text-muted">
                  <b className="font-display text-white">₹ {amount.toLocaleString('en-IN')}</b> · {percent}%
                </span>
              </div>

              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-brand shadow-[0_0_12px_rgba(34,227,160,0.55)]"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}