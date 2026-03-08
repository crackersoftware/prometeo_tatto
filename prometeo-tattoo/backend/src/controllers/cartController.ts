import { Request, Response, NextFunction } from 'express'
import * as cartService from '../services/cartService'

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.getCart(req.user!.userId)
    res.json(cart)
  } catch (err) {
    next(err)
  }
}

export const addItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity = 1 } = req.body
    if (!productId) {
      res.status(400).json({ error: true, message: 'productId es requerido' })
      return
    }
    const cart = await cartService.addItem(req.user!.userId, productId, Number(quantity))
    res.status(201).json(cart)
  } catch (err) {
    next(err)
  }
}

export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { quantity } = req.body
    if (quantity === undefined) {
      res.status(400).json({ error: true, message: 'quantity es requerido' })
      return
    }
    const cart = await cartService.updateItem(req.user!.userId, id, Number(quantity))
    res.json(cart)
  } catch (err) {
    next(err)
  }
}

export const removeItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const cart = await cartService.removeItem(req.user!.userId, id)
    res.json(cart)
  } catch (err) {
    next(err)
  }
}
