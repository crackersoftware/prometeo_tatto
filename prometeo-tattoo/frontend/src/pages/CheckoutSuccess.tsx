import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export default function CheckoutSuccess() {
  const [params] = useSearchParams()
  const { refreshCart } = useCart()
  const paymentId = params.get('payment_id')
  const orderId = params.get('external_reference')

  useEffect(() => {
    document.title = '¡Gracias por tu compra! — Prometeo Tattoo'
    refreshCart()
  }, [refreshCart])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-900/30 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display text-3xl tracking-widest text-[#e8e8e8] mb-4">
          GRACIAS POR TU COMPRA
        </h1>

        <p className="font-body text-[#e8e8e8]/70 mb-2">
          Nos estaremos contactando con vos para ultimar los detalles.
        </p>
        <p className="font-body text-[#e8e8e8]/40 text-sm mb-6">
          Revisá tu email o seguí tu pedido desde tu perfil.
        </p>

        {orderId && (
          <div className="card-dark p-4 mb-6 inline-block mx-auto">
            <p className="text-xs text-[#e8e8e8]/40 font-mono uppercase tracking-widest mb-1">Número de orden</p>
            <p className="font-mono text-accent text-lg font-bold">#{orderId.slice(0, 8).toUpperCase()}</p>
            {paymentId && (
              <p className="text-xs text-[#e8e8e8]/30 font-mono mt-1">Pago: {paymentId}</p>
            )}
          </div>
        )}
        {!orderId && <div className="mb-6" />}

        <div className="flex gap-3 justify-center">
          <Link to="/profile" className="btn-secondary">
            Ver mis órdenes
          </Link>
          <Link to="/" className="btn-primary">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
