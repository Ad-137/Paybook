import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const inputClass = 'h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-white outline-none focus:border-brand'

export default function Register() {
    const { register } = useAuth()
    const Navigate = useNavigate()

    const [Name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(false)
        try {
            await register(Name, email, password)
            Navigate('/dashboard')
        } catch (err) {
            setError(err.responce?.data?.message || err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-8"
            >
                <h1 className="font-display text-3xl font-bold">
                    <span className="text-brand">C</span>reate account
                </h1>
                <p className="text-muted">Start tracking your money with PayBook.</p>

                {error && (
                    <p className="rounded-lg bg-expense/10 px-3 py-2 text-sm text-expense">{error}</p>
                )}

                <label className="flex flex-col gap-1 text-sm text-muted">
                    Name
                    <input
                        type="text"
                        required
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                    />
                </label>

                <label className="flex flex-col gap-1 text-sm text-muted">
                    Email
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                    />
                </label>

                <label className="flex flex-col gap-1 text-sm text-muted">
                    Password
                    <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClass}
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="h-12 rounded-full bg-brand font-semibold text-ink disabled:opacity-60"
                >
                    {loading ? 'Creating account...' : 'Create account'}
                </button>

                <p className="text-sm text-muted">
                    Already have an account? <Link to="/login" className="text-brand">Log in</Link>
                </p>
            </form>
        </div>
    )
}