import { Request, Response } from 'express';
import * as paymentService from '../services/orderService';

export const createOrder = async (req: Request, res: Response) => {
  const { bookId, amount } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const mandate = await paymentService.createOfflineMandate(userId);

    const payment = await paymentService.createPayment(userId, bookId, amount, mandate.id);

    res.status(201).json(payment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const payment = await paymentService.getPaymentById(Number(id));
    res.status(200).json(payment);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
