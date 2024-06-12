import { Request, Response } from 'express';
import * as ratingService from '../services/ratingService';

export const getRatingsForBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const ratings = await ratingService.getRatingsForBook(Number(bookId));
    res.status(200).json(ratings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addRatingForBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { rating } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const newRating = await ratingService.addRatingForBook(Number(bookId), userId, rating);
    res.status(201).json(newRating);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
