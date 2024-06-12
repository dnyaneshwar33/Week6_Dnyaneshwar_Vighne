import { Request, Response } from 'express';
import * as reviewService from '../services/reviewService';

export const getReviewsForBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const reviews = await reviewService.getReviewsForBook(Number(bookId));
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addReviewForBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { content } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const review = await reviewService.addReviewForBook(Number(bookId), userId, content);
    res.status(201).json(review);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReviewById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const isAdmin = req.user?.isAdmin ?? false;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await reviewService.deleteReviewById(Number(id), userId, isAdmin);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
