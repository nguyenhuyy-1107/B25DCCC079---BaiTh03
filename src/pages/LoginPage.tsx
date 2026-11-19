import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface LocationState {
  from?: { pathname: string }
}

export default function LoginPage() {
  const { user, login } = useAuth()
  const location = useLocation()
  const from = (location.state as LocationState | null)?.from?.pathname ?? '/'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!login(username, password)) {
      setError('Sai tên đăng nhập hoặc mật khẩu')
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Đăng nhập</h1>
      <input
        className="input"
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button className="btn" type="submit">
        Đăng nhập
      </button>
    </form>
  )
}
