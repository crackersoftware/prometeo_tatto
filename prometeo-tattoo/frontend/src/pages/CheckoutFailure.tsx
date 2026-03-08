import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function CheckoutFailure() {
  const [params] = useSearchParams()
  const orderId = params.get('external_reference')

  useEffect(() => { document.title = 'Pago fallido — Prometeo Tattoo' }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-900/30 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="font-display text-3xl tracking-widest text-[#e8e8e8] mb-3">PAGO FALLIDO</h1>
        <p className="text-[#e8e8e8]/50 font-body mb-2">
          No se pudo procesar tu pago. Podés intentarlo de nuevo o contactarnos si el problema persiste.
        </p>
        {orderId && (
          <p className="text-xs text-[#e8e8e8]/30 font-mono mb-8">Orden: {orderId.slice(0, 8)}…</p>
        )}
        {!orderId && <div className="mb-8" />}

        <div className="flex gap-3 justify-center">
          <Link to="/checkout" className="btn-primary">Reintentar</Link>
          <Link to="/cart" className="btn-secondary">Volver al carrito</Link>
        </div>
      </div>
    </div>
  )
}
