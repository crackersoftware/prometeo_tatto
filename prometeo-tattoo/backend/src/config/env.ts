const isProd = process.env.NODE_ENV === 'production'

function required(key: string): string {
  const val = process.env[key]
  if (!val) {
    if (isProd) throw new Error(`[env] Variable de entorno requerida faltante: ${key}`)
    console.warn(`[env] ADVERTENCIA: ${key} no definido`)
  }
  return val ?? ''
}

function optional(key: string, fallback = ''): string {
  return process.env[key] ?? fallback
}

export const env = {
  PORT: optional('PORT', '4000'),
  NODE_ENV: optional('NODE_ENV', 'development'),
  DATABASE_URL: required('DATABASE_URL'),
  JWT_SECRET: required('JWT_SECRET'),
  MERCADOPAGO_ACCESS_TOKEN: required('MERCADOPAGO_ACCESS_TOKEN'),
  MERCADOPAGO_PUBLIC_KEY: optional('MERCADOPAGO_PUBLIC_KEY'),
  MERCADOPAGO_WEBHOOK_SECRET: optional('MERCADOPAGO_WEBHOOK_SECRET'),
  FRONTEND_URL: required('FRONTEND_URL'),
  BACKEND_URL: required('BACKEND_URL'),
  ALLOWED_ORIGINS: optional('ALLOWED_ORIGINS', 'http://localhost:5173'),
}

if (isProd && !env.MERCADOPAGO_WEBHOOK_SECRET) {
  throw new Error('[env] MERCADOPAGO_WEBHOOK_SECRET es obligatorio en producción')
}
