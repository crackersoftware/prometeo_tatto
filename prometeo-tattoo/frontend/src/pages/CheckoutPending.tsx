import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function CheckoutPending() {
  const [params] = useSearchParams()
  const orderId = params.get('external_reference')
  const paymentId = params.get('payment_id')

  useEffect(() => { document.title = 'Pago pendiente — Prometeo Tattoo' }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-yellow-900/30 border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="font-display text-3xl tracking-widest text-[#e8e8e8] mb-3">PAGO PENDIENTE</h1>
        <p className="text-[#e8e8e8]/50 font-body mb-2">
          Tu pago está siendo procesado. Te notificaremos cuando sea confirmado.
        </p>
        <p className="text-[#e8e8e8]/30 text-sm font-body mb-2">
          Esto puede demorar hasta 24 horas según el método de pago elegido.
        </p>
        {orderId && (
          <p className="text-xs text-[#e8e8e8]/30 font-mono mb-1">Orden: {orderId.slice(0, 8)}…</p>
        )}
        {paymentId && (
          <p className="text-xs text-[#e8e8e8]/30 font-mono mb-8">Pago: #{paymentId}</p>
        )}
        {!orderId && <div className="mb-8" />}

        <div className="flex gap-3 justify-center">
          <Link to="/profile" className="btn-secondary">Ver mis órdenes</Link>
          <Link to="/shop" className="btn-primary">Seguir comprando</Link>
        </div>
      </div>
    </div>
  )
}
