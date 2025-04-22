import express from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roleCheck.js';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

// @route   POST /api/categories
// @desc    Create new category (admin only)
// @access  Private (Admin)
router.post(
  '/',
  [auth, authorizeRole(['admin']), [check('name', 'Name is required').not().isEmpty()]],
  createCategory
);

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getAllCategories);

// @route   GET /api/categories/:id
// @desc    Get specific category
// @access  Public
router.get('/:id', getCategoryById);

// @route   PUT /api/categories/:id
// @desc    Update category (admin only)
// @access  Private (Admin)
router.put(
  '/:id',
  [auth, authorizeRole(['admin']), [check('name', 'Name is required').not().isEmpty()]],
  updateCategory
);

// @route   DELETE /api/categories/:id
// @desc    Delete category (admin only)
// @access  Private (Admin)
router.delete('/:id', [auth, authorizeRole(['admin'])], deleteCategory);

export default router;