import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextValue {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const STORAGE_KEY = 'shopmini_user'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function readUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readUser)

  const login = (username: string, password: string): boolean => {
    if (!username.trim() || password !== '123456') {
      return false
    }
    const nextUser: User = { username: username.trim() }
    setUser(nextUser)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    } catch {
      return true
    }
    return true
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      return
    }
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
