// src/services/bookService.ts
import axios from 'axios';
import Author from '../models/authorModel';
import Book from '../models/bookModel';
import Review from '../models/reviewModel';
import Rating from '../models/ratingModel';
import { Op } from 'sequelize';
import sequelize from '../postgresDB/pgConfig';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const getAllBooks = async () => {
  return Book.findAll({
    include: [
      { model: Author, through: { attributes: [] } },
      { model: Review },
      { model: Rating }
    ],
  });
};

export const getBookById = async (id: number) => {
  const book = await Book.findByPk(id, {
    include: [
      { model: Author, through: { attributes: [] } },
      { model: Review },
      { model: Rating }
    ],
  });

  if (book) {
    const averageRating = await Rating.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']
      ],
      where: { bookId: id }
    });

    return {
      ...book.toJSON(),
      averageRating: averageRating?.get('avgRating') || 0
    };
  }

  return null;
};


export const createBook = async (title: string, description: string, publishedYear: number, price: number, bookCode: string, externalId: string, authorIds: number[]) => {
  try {
    const book = await Book.create({ title, description, publishedYear, price, bookCode, externalId });

    if (authorIds && authorIds.length > 0) {
      await book.setAuthors(authorIds);
    }

    return book;
  } catch (error:any) {
    throw new Error('Error creating book: ' + error.message);
  }
};


export const updateBook = async (id: number, updates: Partial<Book>) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  return book.update(updates);
};

export const deleteBook = async (id: number) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error('Book not found');
  }
  return book.destroy();
};

export const fetchBookDetailsFromGoogleBooks = async (query: string) => {
  const response = await axios.get(GOOGLE_BOOKS_API_URL, { params: { q: query } });
  return response.data.items;
};
