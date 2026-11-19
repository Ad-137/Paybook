import { createContext, useContext, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch {
      localStorage.removeItem('user')
      return null
    }
  })

  const saveSession = (data) => {
    const { token, ...rest } = data
    const userData = data.user || rest

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    saveSession(res.data)
  }

  const register = async (Name, email, password) => {
    const res = await api.post('/auth/register', { Name , email, password })
    saveSession(res.data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}