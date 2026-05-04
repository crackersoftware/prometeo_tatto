import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'

// Set env vars before importing app
beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret'
  process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/test'
  process.env.DIRECT_URL = 'postgresql://user:pass@localhost:5432/test'
  process.env.MERCADOPAGO_ACCESS_TOKEN = 'TEST-dummy'
  process.env.ALLOWED_ORIGINS = 'http://localhost:5173'
  process.env.NODE_ENV = 'test'
})

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const { default: app } = await import('../app')
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ status: 'ok' })
  })
})
