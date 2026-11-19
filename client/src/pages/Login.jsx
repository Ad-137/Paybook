import { useState } from "react";
import { Link , useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

export default function Login(){
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)   
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try{
            await login( email , password)
            navigate('/dashboard')
        }catch (err) {
      console.log(err)
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message
      )
    }finally{
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
          <span className="text-brand">L</span>og in
        </h1>
        <p className="text-muted">Welcome back to PayBook.</p>

        {error && (
          <p className="rounded-lg bg-expense/10 px-3 py-2 text-sm text-expense">{error}</p>
        )}

        <label className="flex flex-col gap-1 text-sm text-muted">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-white outline-none focus:border-brand"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-muted">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-white outline-none focus:border-brand"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="h-12 rounded-full bg-brand font-semibold text-ink disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <p className="text-sm text-muted">
          New here? <Link to="/register" className="text-brand">Create an account</Link>
        </p>
      </form>
    </div>
  )
}