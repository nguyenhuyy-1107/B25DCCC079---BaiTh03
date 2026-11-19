import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts } from '../features/products/productsSlice'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.products)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return items.filter((product) => product.title.toLowerCase().includes(keyword))
  }, [items, query])

  return (
    <div>
      <input
        className="input search"
        type="text"
        placeholder="Tìm sản phẩm theo tên..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {status === 'loading' && <p className="muted">Đang tải...</p>}
      {status === 'failed' && (
        <div>
          <p className="error">{error}</p>
          <button className="btn" onClick={() => dispatch(fetchProducts())}>
            Thử lại
          </button>
        </div>
      )}
      {status === 'succeeded' && filtered.length === 0 && (
        <p className="muted">Không tìm thấy sản phẩm.</p>
      )}
      <div className="grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
