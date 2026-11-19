import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCartCount } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const count = useAppSelector(selectCartCount)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          ShopMini
        </Link>
        <nav className="nav">
          <NavLink to="/cart">Giỏ hàng ({count})</NavLink>
          {user ? (
            <>
              <span className="muted">{user.username}</span>
              <button className="btn btn-outline" onClick={logout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <NavLink to="/login">Đăng nhập</NavLink>
          )}
          <button className="btn btn-outline" onClick={toggleTheme}>
            {theme === 'light' ? 'Tối' : 'Sáng'}
          </button>
        </nav>
      </div>
    </header>
  )
}
