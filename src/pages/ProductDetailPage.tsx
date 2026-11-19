import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts } from '../features/products/productsSlice'
import { addToCart } from '../features/cart/cartSlice'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { items, status } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const product = items.find((item) => item.id === Number(id))

  if (status === 'idle' || status === 'loading') {
    return <p className="muted">Đang tải...</p>
  }

  if (!product) {
    return (
      <div>
        <p>Không tìm thấy sản phẩm.</p>
        <Link to="/">Về trang chủ</Link>
      </div>
    )
  }

  return (
    <div className="detail">
      <div className="detail-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="detail-info">
        <span className="muted">{product.category}</span>
        <h1>{product.title}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <button className="btn" onClick={() => dispatch(addToCart(product))}>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  )
}
