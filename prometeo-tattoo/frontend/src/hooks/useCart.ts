import { useCallback, useEffect } from 'react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import * as cartService from '../services/cartService'

export function useCart() {
  const { cart, isOpen, setCart, openCart, closeCart, toggleCart, itemCount, total } =
    useCartStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      cartService.getCart().then(setCart).catch(console.error)
    } else {
      setCart(null)
    }
  }, [isAuthenticated, setCart])

  const addItem = async (productId: string, quantity: number = 1) => {
    const updated = await cartService.addItem(productId, quantity)
    setCart(updated)
    openCart()
  }

  const updateItem = async (itemId: string, quantity: number) => {
    const updated = await cartService.updateItem(itemId, quantity)
    setCart(updated)
  }

  const removeItem = async (itemId: string) => {
    const updated = await cartService.removeItem(itemId)
    setCart(updated)
  }

  const refreshCart = useCallback(async () => {
    if (isAuthenticated) {
      const updated = await cartService.getCart()
      setCart(updated)
    }
  }, [isAuthenticated, setCart])

  return {
    cart,
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    itemCount: itemCount(),
    total: total(),
    addItem,
    updateItem,
    removeItem,
    refreshCart,
  }
}
