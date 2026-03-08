import { Router } from 'express'
import { createOrder, getOrders, getOrderById } from '../controllers/orderController'
import { auth } from '../middlewares/auth'

const router = Router()

router.use(auth)
router.post('/', createOrder)
router.get('/', getOrders)
router.get('/:id', getOrderById)

export default router
