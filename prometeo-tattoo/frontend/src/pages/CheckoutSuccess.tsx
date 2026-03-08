import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export default function CheckoutSuccess() {
  const [params] = useSearchParams()
  const { refreshCart } = useCart()
  const paymentId = params.get('payment_id')
  const orderId = params.get('external_reference')

  useEffect(() => {
    document.title = 'Pago exitoso — Prometeo Tattoo'
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

        <h1 className="font-display text-3xl tracking-widest text-[#e8e8e8] mb-3">¡PAGO EXITOSO!</h1>
        <p className="text-[#e8e8e8]/50 font-body mb-2">Tu pedido fue confirmado y está siendo procesado.</p>

        {orderId && (
          <p className="text-xs text-[#e8e8e8]/30 font-mono mb-1">Orden: {orderId.slice(0, 8)}…</p>
        )}
        {paymentId && (
          <p className="text-xs text-[#e8e8e8]/30 font-mono mb-8">Pago: #{paymentId}</p>
        )}
        {!paymentId && <div className="mb-8" />}

        <div className="flex gap-3 justify-center">
          <Link to="/profile" className="btn-secondary">
            Ver mis órdenes
          </Link>
          <Link to="/shop" className="btn-primary">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
