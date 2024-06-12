import Author from '../models/authorModel';
import Book from '../models/bookModel';

export const getAllAuthors = async () => {
  return Author.findAll({
    include: [Book]
  });
};

export const getAuthorById = async (id: number) => {
  return Author.findByPk(id, {
    include: [Book]
  });
};

export const createAuthor = async (name: string, bio: string, birthdate: Date, isSystemUser: boolean) => {
  return Author.create({ name, bio, birthdate, isSystemUser });
};

export const updateAuthor = async (id: number, updates: Partial<Author>) => {
  const author = await Author.findByPk(id);
  if (!author) {
    throw new Error('Author not found');
  }
  return author.update(updates);
};

export const deleteAuthor = async (id: number) => {
  const author = await Author.findByPk(id);
  if (!author) {
    throw new Error('Author not found');
  }
  return author.destroy();
};
