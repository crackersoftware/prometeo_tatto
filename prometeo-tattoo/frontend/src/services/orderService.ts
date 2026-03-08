import api from './api'

export interface CreateOrderPayload {
  address: string
  phone?: string
  notes?: string
}

export async function createOrder(payload: CreateOrderPayload) {
  const { data } = await api.post('/orders', payload)
  return data
}

export async function getOrders() {
  const { data } = await api.get('/orders')
  return data
}

export async function getOrderById(id: string) {
  const { data } = await api.get(`/orders/${id}`)
  return data
}
