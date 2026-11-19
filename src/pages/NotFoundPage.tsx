import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p className="muted">Trang không tồn tại.</p>
      <Link to="/">Về trang chủ</Link>
    </div>
  )
}
