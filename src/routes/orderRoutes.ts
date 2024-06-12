import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/orders', authMiddleware, orderController.createOrder);
router.get('/orders/:id', authMiddleware, orderController.getOrderById);

export default router;
