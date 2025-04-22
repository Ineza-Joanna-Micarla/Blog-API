import express from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roleCheck.js';
import { checkBlogOwnership } from '../middleware/ownerCheck.js';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
} from '../controllers/blogController.js';

const router = express.Router();

// @route   POST /api/blogs
// @desc    Create a new blog
// @access  Private (Authors)
router.post(
  '/',
  [auth, authorizeRole(['author']), [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    check('category', 'Category is required').isMongoId(),
  ]],
  createBlog
);

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', getAllBlogs);

// @route   GET /api/blogs/:id
// @desc    Get a specific blog by ID
// @access  Public
router.get('/:id', getBlogById);

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private (Author of the blog or Admin)
router.put(
  '/:id',
  [auth, checkBlogOwnership, [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    check('category', 'Category is required').isMongoId(),
  ]],
  updateBlog
);

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private (Author of the blog or Admin)
router.delete('/:id', [auth, checkBlogOwnership], deleteBlog);

// @route   GET /api/blogs/category/:categoryId
// @desc    Get blogs by category
// @access  Public
router.get('/category/:categoryId', getBlogsByCategory);

export default router;