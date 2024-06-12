import express from 'express';
import * as reviewController from '../controllers/reviewController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/books/:bookId/reviews', reviewController.getReviewsForBook);
router.post('/books/:bookId/reviews', authMiddleware, reviewController.addReviewForBook);
router.delete('/reviews/:id', authMiddleware, reviewController.deleteReviewById);

export default router;
