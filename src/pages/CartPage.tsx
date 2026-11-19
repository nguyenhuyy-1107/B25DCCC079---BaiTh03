import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from '../features/cart/cartSlice'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)

  if (items.length === 0) {
    return (
      <div>
        <h1>Giỏ hàng</h1>
        <p className="muted">Giỏ hàng trống.</p>
        <Link to="/">Tiếp tục mua sắm</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Giỏ hàng</h1>
      <div className="list">
        {items.map((item) => (
          <div className="row" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="row-info">
              <Link to={`/products/${item.id}`}>{item.title}</Link>
              <span className="muted">${item.price.toFixed(2)}</span>
            </div>
            <div className="qty">
              <button
                className="btn btn-outline"
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn btn-outline"
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              >
                +
              </button>
            </div>
            <strong className="row-total">${(item.price * item.quantity).toFixed(2)}</strong>
            <button className="btn btn-outline" onClick={() => dispatch(removeFromCart(item.id))}>
              Xoá
            </button>
          </div>
        ))}
      </div>
      <div className="summary">
        <p>
          Tổng cộng: <strong>${total.toFixed(2)}</strong>
        </p>
        <div className="actions">
          <button className="btn btn-outline" onClick={() => dispatch(clearCart())}>
            Xoá giỏ hàng
          </button>
          <Link to="/checkout" className="btn">
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  )
}
