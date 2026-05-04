import { z } from 'zod'

const emptyToUndefined = (s: unknown) =>
  typeof s === 'string' && s.trim() === '' ? undefined : s

export const createOrderSchema = z.object({
  address: z.string().min(1, 'La dirección es requerida').max(500).transform((s) => s.trim()),
  phone: z.preprocess(emptyToUndefined, z.string().max(50).optional()),
  notes: z.preprocess(emptyToUndefined, z.string().max(1000).optional()),
})
