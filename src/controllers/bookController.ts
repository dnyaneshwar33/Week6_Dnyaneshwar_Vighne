import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await bookService.getBookById(Number(id));
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const createBook = async (req: Request, res: Response) => {
  const { title, description, publishedYear, price, bookCode, externalId, authorIds } = req.body;
  try {
    const book = await bookService.createBook(title, description, publishedYear, price, bookCode, externalId, authorIds);
    res.status(201).json(book);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};


export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await bookService.updateBook(Number(id), req.body);
    res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await bookService.deleteBook(Number(id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchBookDetailsFromGoogleBooks = async (req: Request, res: Response) => {
  const { query } = req.query;
  try {
    const details = await bookService.fetchBookDetailsFromGoogleBooks(query as string);
    res.status(200).json(details);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
