import api from './api'

export async function getCart() {
  const { data } = await api.get('/cart')
  return data
}

export async function addItem(productId: string, quantity: number = 1) {
  const { data } = await api.post('/cart/items', { productId, quantity })
  return data
}

export async function updateItem(itemId: string, quantity: number) {
  const { data } = await api.patch(`/cart/items/${itemId}`, { quantity })
  return data
}

export async function removeItem(itemId: string) {
  const { data } = await api.delete(`/cart/items/${itemId}`)
  return data
}
