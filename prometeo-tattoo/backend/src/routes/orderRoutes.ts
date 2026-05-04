import { Router } from 'express'
import { createOrder, getOrders, getOrderById } from '../controllers/orderController'
import { auth } from '../middlewares/auth'
import { validate } from '../middlewares/validate'
import { createOrderSchema } from '../schemas/order'

const router = Router()

router.use(auth)
router.post('/', validate(createOrderSchema), createOrder)
router.get('/', getOrders)
router.get('/:id', getOrderById)

export default router
