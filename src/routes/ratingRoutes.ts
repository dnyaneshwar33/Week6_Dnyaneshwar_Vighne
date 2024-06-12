import express from 'express';
import * as ratingController from '../controllers/ratingController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/books/:bookId/ratings', ratingController.getRatingsForBook);
router.post('/books/:bookId/ratings', authMiddleware, ratingController.addRatingForBook);

export default router;
