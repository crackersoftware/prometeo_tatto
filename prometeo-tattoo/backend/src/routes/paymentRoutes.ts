import { Router } from 'express'
import { auth } from '../middlewares/auth'
import { createPreference, webhook } from '../controllers/paymentController'

const router = Router()

router.post('/create-preference', auth, createPreference)
router.post('/webhook', webhook)

export default router
