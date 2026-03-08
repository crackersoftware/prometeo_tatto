import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useAuth } from '../hooks/useAuth'
import { getOrders } from '../services/orderService'

interface Order {
  id: string
  total: number
  status: string
  address: string
  createdAt: string
  items: Array<{
    id: string
    quantity: number
    price: number
    product: { name: string; image: string }
  }>
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  SHIPPED: 'Enviada',
  DELIVERED: 'Entregada',
  CANCELLED: 'Cancelada',
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'text-yellow-400',
  CONFIRMED: 'text-blue-400',
  SHIPPED: 'text-purple-400',
  DELIVERED: 'text-green-400',
  CANCELLED: 'text-red-400',
}

export default function Profile() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user, isAuthenticated } = useAuthStore()
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Mi perfil — Prometeo Tattoo'
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    getOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Datos del usuario */}
        <div className="card-dark p-8 flex items-center justify-between">
          <div>
            <h1 className="section-title text-2xl mb-1">{user?.name}</h1>
            <p className="text-muted text-sm">{user?.email}</p>
            {user?.role === 'ADMIN' && (
              <span className="text-xs text-accent font-semibold mt-1 inline-block">ADMIN</span>
            )}
          </div>
          <button className="btn-ghost text-sm" onClick={logout}>
            Cerrar sesión
          </button>
        </div>

        {/* Historial de órdenes */}
        <div>
          <h2 className="font-display text-2xl tracking-widest text-[#e8e8e8] mb-4">
            MIS ÓRDENES
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-dark p-6 skeleton h-24" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="card-dark p-12 text-center">
              <p className="text-muted mb-4">Todavía no realizaste ninguna compra</p>
              <button className="btn-primary" onClick={() => navigate('/shop')}>
                Explorar productos
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="card-dark p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-mono text-muted mb-1">#{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-[#e8e8e8]/60">
                        {new Date(order.createdAt).toLocaleDateString('es-AR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${STATUS_COLORS[order.status] ?? 'text-muted'}`}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </p>
                      <p className="text-accent font-mono font-semibold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex-shrink-0 flex items-center gap-2 bg-surface rounded px-3 py-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <div>
                          <p className="text-xs text-[#e8e8e8] max-w-[120px] truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
