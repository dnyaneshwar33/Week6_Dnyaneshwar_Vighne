
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';
import reviewRoutes from './routes/reviewRoutes';
import ratingRoutes from './routes/ratingRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);
app.use('/ratings', ratingRoutes);
app.use('/orders', orderRoutes);

export default app;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
