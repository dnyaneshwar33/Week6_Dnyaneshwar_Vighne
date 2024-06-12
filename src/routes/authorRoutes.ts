import { Router } from 'express';
import { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController';
import authMiddleware from '../middlewares/authMiddleware';
import adminMiddleware from '../middlewares/adminMiddleware';

const router = Router();

router.get('/authors', getAuthors);
router.get('/authors/:id', getAuthor);
router.post('/authors', authMiddleware, adminMiddleware, createAuthor);
router.put('/authors/:id', authMiddleware, adminMiddleware, updateAuthor);
router.delete('/authors/:id', authMiddleware, adminMiddleware, deleteAuthor);

export default router;
