import { Request, Response } from 'express';
import * as authorService from '../services/authorService';

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const author = await authorService.getAuthorById(Number(req.params.id));
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.status(200).json(author);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  const { name, bio, birthdate, isSystemUser } = req.body;

  try {
    const author = await authorService.createAuthor(name, bio, birthdate, isSystemUser);
    res.status(201).json(author);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const author = await authorService.updateAuthor(Number(id), updates);
    res.status(200).json(author);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await authorService.deleteAuthor(Number(id));
    res.status(200).json({message:"Deleted author"});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
