export default function SummaryCard({ label , amount , color}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
            <p className={`mt-2 font-display text-2xl font-bold ${color}`}>
                ₹ {amount.toLocaleString('en-IN')}
            </p>
        </div>
    )
}