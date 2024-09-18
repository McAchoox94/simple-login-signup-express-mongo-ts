import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Routes d'authentification
app.use('/auth', authRoutes);

mongoose.connect('mongodb://localhost:27017/login-signup-db')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
