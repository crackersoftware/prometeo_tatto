import { prisma } from '../config/prisma'
import { clearCart } from './cartService'

async function getShippingConfig(): Promise<{ threshold: number; cost: number }> {
  const configs = await prisma.storeConfig.findMany({
    where: { key: { in: ['free_shipping_threshold', 'shipping_cost'] } },
  })
  const map = Object.fromEntries(configs.map((c) => [c.key, parseFloat(c.value)]))
  return {
    threshold: map['free_shipping_threshold'] ?? 15000,
    cost: map['shipping_cost'] ?? 3500,
  }
}

export function calcShipping(subtotal: number, threshold: number, cost: number): number {
  return subtotal >= threshold ? 0 : cost
}

export async function createOrder(
  userId: string,
  address: string,
  phone?: string,
  notes?: string,
) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  })

  if (!cart || cart.items.length === 0) {
    const err: Error & { statusCode?: number } = new Error('El carrito está vacío')
    err.statusCode = 400
    throw err
  }

  // Verificar stock de todos los items antes de crear la orden
  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      const err: Error & { statusCode?: number } = new Error(
        `Stock insuficiente para "${item.product.name}". Disponible: ${item.product.stock}`,
      )
      err.statusCode = 409
      throw err
    }
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const { threshold, cost } = await getShippingConfig()
  const shippingCost = calcShipping(subtotal, threshold, cost)
  const total = subtotal + shippingCost

  const order = await prisma.$transaction(async (tx) => {
    // Decrementar stock de cada producto
    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      })
    }

    const newOrder = await tx.order.create({
      data: {
        userId,
        total,
        address,
        phone,
        notes,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
            name: item.product.name,
          })),
        },
      },
      include: {
        items: { include: { product: { include: { category: true } } } },
      },
    })

    return newOrder
  })

  await clearCart(userId)

  return order
}

export async function getOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      items: { include: { product: true } },
    },
  })
}

export async function getOrderById(userId: string, orderId: string) {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: {
      items: { include: { product: { include: { category: true } } } },
    },
  })

  if (!order) {
    const err: Error & { statusCode?: number } = new Error('Orden no encontrada')
    err.statusCode = 404
    throw err
  }

  return order
}
