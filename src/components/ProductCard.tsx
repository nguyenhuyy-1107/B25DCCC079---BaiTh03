import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  return (
    <div className="card">
      <Link to={`/products/${product.id}`} className="card-image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <Link to={`/products/${product.id}`} className="card-title">
        {product.title}
      </Link>
      <div className="card-footer">
        <strong>${product.price.toFixed(2)}</strong>
        <button className="btn" onClick={() => dispatch(addToCart(product))}>
          Thêm
        </button>
      </div>
    </div>
  )
}
