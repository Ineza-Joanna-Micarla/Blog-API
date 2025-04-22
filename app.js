import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import blogRoutes from './routes/blogs.js';
import categoryRoutes from './routes/categories.js';

const app = express();

// Connect to Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);

// Default route
app.get('/', (req, res) => res.send('API Running'));

export default app;