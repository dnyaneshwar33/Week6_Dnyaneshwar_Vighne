import Review from '../models/reviewModel';

export const getReviewsForBook = async (bookId: number) => {
  return Review.findAll({ where: { bookId } });
};

export const addReviewForBook = async (bookId: number, userId: number, content: string) => {
  return Review.create({ bookId, userId, content });
};

export const deleteReviewById = async (reviewId: number, userId: number, isAdmin: boolean) => {
  const review = await Review.findByPk(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }
  if (review.userId !== userId && !isAdmin) {
    throw new Error('Unauthorized');
  }
  return review.destroy();
};
