import QuantitySelector from './QuantitySelector'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'

interface CartItemProps {
  item: {
    id: string
    quantity: number
    product: {
      id: string
      name: string
      price: number
      images: string[]
      stock: number
    }
  }
}

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='%231a1a1a'/%3E%3C/svg%3E"

export default function CartItem({ item }: CartItemProps) {
  const { updateItem, removeItem } = useCart()
  const img = item.product.images?.[0] || PLACEHOLDER

  return (
    <div className="flex gap-3 py-3 border-b border-white/5">
      <img
        src={img}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded bg-white/5 flex-shrink-0"
        onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium truncate">{item.product.name}</p>
        <p className="text-accent font-mono text-sm mt-0.5">
          {formatPrice(item.product.price)}
        </p>
        <div className="flex items-center justify-between mt-2">
          <QuantitySelector
            value={item.quantity}
            max={item.product.stock}
            onChange={(qty) => updateItem(item.id, qty)}
          />
          <button
            onClick={() => removeItem(item.id)}
            className="text-xs text-gray-600 hover:text-red-400 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
