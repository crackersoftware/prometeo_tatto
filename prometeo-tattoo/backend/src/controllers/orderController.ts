import { Request, Response, NextFunction } from 'express'
import * as orderService from '../services/orderService'

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { address, phone, notes } = req.body
    if (!address) {
      res.status(400).json({ error: true, message: 'address es requerido' })
      return
    }
    const order = await orderService.createOrder(req.user!.userId, address, phone, notes)
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
}

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderService.getOrders(req.user!.userId)
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderService.getOrderById(req.user!.userId, req.params.id)
    res.json(order)
  } catch (err) {
    next(err)
  }
}
