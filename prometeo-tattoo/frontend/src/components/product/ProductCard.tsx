import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import { useCart } from '../../hooks/useCart'
import { useAuthStore } from '../../store/authStore'

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='14' fill='%23444' text-anchor='middle' dominant-baseline='middle'%3ESin imagen%3C/text%3E%3C/svg%3E"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const outOfStock = product.stock === 0
  const mainImage = product.images?.[0] || PLACEHOLDER

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!isAuthenticated) { navigate('/login'); return }
    setAdding(true)
    try {
      await addItem(product.id, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="group relative card-dark overflow-hidden hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200 flex flex-col">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden bg-surface">
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = PLACEHOLDER
            }}
          />
        </div>
      </Link>

      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1">
        {product.onSale && (
          <span className="px-2 py-0.5 bg-accent text-white text-xs font-mono uppercase tracking-wider rounded">
            OFERTA
          </span>
        )}
        {product.featured && !product.onSale && (
          <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-mono uppercase tracking-wider rounded border border-gold/30">
            Destacado
          </span>
        )}
      </div>

      {/* Out of stock */}
      {outOfStock && (
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 bg-black/60 text-[#e8e8e8]/50 text-xs font-mono uppercase tracking-wider rounded">
            Sin stock
          </span>
        </div>
      )}

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.slug}`}>
          {product.category && (
            <p className="text-xs font-mono text-gold/60 uppercase tracking-wider mb-1">
              {product.category.name}
            </p>
          )}
          <h3 className="font-body font-semibold text-[#e8e8e8] leading-snug line-clamp-2 group-hover:text-white transition-colors text-sm">
            {product.name}
          </h3>
          <p className="text-xs text-[#e8e8e8]/40 mt-1">{product.brand}</p>
        </Link>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-mono text-accent font-semibold text-base">
              {formatPrice(product.price)}
            </span>
            {product.onSale && product.comparePrice && (
              <span className="font-mono text-[#e8e8e8]/30 text-sm line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>
          {product.stock > 0 && product.stock <= 5 && (
            <span className="text-xs font-mono text-orange-400">
              {product.stock} restantes
            </span>
          )}
        </div>

        <button
          className={`btn-primary w-full py-2 text-sm mt-3 ${added ? 'bg-green-700 hover:bg-green-700' : ''}`}
          disabled={outOfStock || adding}
          onClick={handleAddToCart}
        >
          {added ? '¡Agregado!' : adding ? 'Agregando...' : outOfStock ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}
