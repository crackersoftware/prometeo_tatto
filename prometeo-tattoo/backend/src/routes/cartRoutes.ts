import { Router } from 'express'
import { getCart, addItem, updateItem, removeItem } from '../controllers/cartController'
import { auth } from '../middlewares/auth'

const router = Router()

router.use(auth)
router.get('/', getCart)
router.post('/items', addItem)
router.patch('/items/:id', updateItem)
router.delete('/items/:id', removeItem)

export default router
