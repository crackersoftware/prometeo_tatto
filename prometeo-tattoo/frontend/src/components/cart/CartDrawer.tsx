import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import CartItem from './CartItem'
import Button from '../ui/Button'
import { formatPrice } from '../../utils/formatPrice'

export default function CartDrawer() {
  const { cart, isOpen, closeCart, itemCount, total } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={closeCart} />

      <div className="fixed right-0 top-0 h-full w-full max-w-sm z-50 bg-[#111114] border-l border-white/10 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="font-bold text-white">
            Carrito{' '}
            {itemCount > 0 && (
              <span className="text-sm text-gray-400 font-normal">({itemCount} items)</span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {!cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-4xl">🛒</span>
              <p className="text-gray-500">Tu carrito está vacío</p>
              <Button variant="secondary" size="sm" onClick={closeCart}>
                Seguir comprando
              </Button>
            </div>
          ) : (
            cart.items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <div className="px-5 py-4 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-mono font-semibold">{formatPrice(total)}</span>
            </div>
            <Button
              fullWidth
              onClick={() => {
                closeCart()
                navigate('/checkout')
              }}
            >
              Ir al checkout
            </Button>
            <Button variant="ghost" fullWidth onClick={() => { closeCart(); navigate('/cart') }}>
              Ver carrito completo
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
