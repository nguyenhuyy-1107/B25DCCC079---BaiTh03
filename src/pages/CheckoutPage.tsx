import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearCart, selectCartItems, selectCartTotal } from '../features/cart/cartSlice'

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const [ordered, setOrdered] = useState(false)

  const handleOrder = () => {
    dispatch(clearCart())
    setOrdered(true)
  }

  if (ordered) {
    return (
      <div>
        <h1>Thanh toán</h1>
        <p className="success">Đặt hàng thành công. Cảm ơn bạn đã mua sắm!</p>
        <Link to="/">Về trang chủ</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div>
        <h1>Thanh toán</h1>
        <p className="muted">Giỏ hàng trống.</p>
        <Link to="/">Về trang chủ</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Thanh toán</h1>
      <div className="list">
        {items.map((item) => (
          <div className="row" key={item.id}>
            <div className="row-info">
              <span>{item.title}</span>
              <span className="muted">
                ${item.price.toFixed(2)} × {item.quantity}
              </span>
            </div>
            <strong className="row-total">${(item.price * item.quantity).toFixed(2)}</strong>
          </div>
        ))}
      </div>
      <div className="summary">
        <p>
          Tổng cộng: <strong>${total.toFixed(2)}</strong>
        </p>
        <button className="btn" onClick={handleOrder}>
          Đặt hàng
        </button>
      </div>
    </div>
  )
}
