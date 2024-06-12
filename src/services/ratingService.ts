import Rating from '../models/ratingModel';

export const getRatingsForBook = async (bookId: number) => {
  return Rating.findAll({ where: { bookId } });
};

export const addRatingForBook = async (bookId: number, userId: number, rating: number) => {
  return Rating.create({ bookId, userId, rating });
};
