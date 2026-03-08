import { MercadoPagoConfig, Preference } from 'mercadopago'
import { env } from '../config/env'

function getMPClient() {
  if (!env.MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN no configurado')
  }
  return new MercadoPagoConfig({ accessToken: env.MERCADOPAGO_ACCESS_TOKEN })
}

export async function createPreference(order: {
  id: string
  total: number
  items: { name: string; quantity: number; price: number }[]
  userEmail: string
}) {
  const client = getMPClient()
  const preference = new Preference(client)

  const frontendUrl = env.FRONTEND_URL
  const backendUrl = env.BACKEND_URL

  const response = await preference.create({
    body: {
      items: order.items.map((item) => ({
        id: order.id,
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: 'ARS',
      })),
      payer: {
        email: order.userEmail,
      },
      back_urls: {
        success: `${frontendUrl}/checkout/success`,
        failure: `${frontendUrl}/checkout/failure`,
        pending: `${frontendUrl}/checkout/pending`,
      },
      auto_return: 'approved',
      external_reference: order.id,
      notification_url: `${backendUrl}/api/payments/webhook`,
    },
  })

  return {
    preferenceId: response.id,
    initPoint: response.init_point,
    sandboxInitPoint: response.sandbox_init_point,
  }
}
