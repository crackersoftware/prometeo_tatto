import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useAuthStore } from '../store/authStore'
import CartItem from '../components/cart/CartItem'
import { formatPrice } from '../utils/formatPrice'

export default function Cart() {
  const { cart, total, itemCount } = useCart()
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Carrito — Prometeo Tattoo'
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title mb-8">Carrito</h1>
          <div className="card-dark p-12 text-center">
            <p className="text-[#e8e8e8]/40 mb-6">Iniciá sesión para ver tu carrito</p>
            <Link to="/login" className="btn-primary">Iniciar sesión</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-title mb-8">Carrito</h1>

        {!cart || cart.items.length === 0 ? (
          <div className="card-dark p-12 text-center">
            <svg className="w-12 h-12 text-[#e8e8e8]/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="font-display text-xl tracking-widest text-[#e8e8e8]/40 mb-4">TU CARRITO ESTÁ VACÍO</h2>
            <Link to="/shop" className="btn-primary">Explorar productos</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 card-dark p-6">
              <h2 className="font-body font-semibold text-[#e8e8e8] mb-4">
                {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
              </h2>
              <div className="divide-y divide-border">
                {cart.items.map((item) => <CartItem key={item.id} item={item} />)}
              </div>
            </div>

            <div className="card-dark p-6 h-fit">
              <h2 className="font-body font-semibold text-[#e8e8e8] mb-4">Resumen</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#e8e8e8]/60">Subtotal</span>
                  <span className="text-[#e8e8e8] font-mono">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#e8e8e8]/60">Envío</span>
                  <span className="text-[#e8e8e8]/60">Calculado en checkout</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-semibold">
                  <span className="text-[#e8e8e8]">Total</span>
                  <span className="text-accent font-mono">{formatPrice(total)}</span>
                </div>
              </div>
              <button className="btn-primary w-full" onClick={() => navigate('/checkout')}>
                Proceder al checkout
              </button>
              <Link to="/shop" className="btn-ghost w-full mt-3 text-sm text-center block">
                Seguir comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
