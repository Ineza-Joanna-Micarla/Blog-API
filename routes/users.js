import express from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';
import { authorizeRole } from '../middleware/roleCheck.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private (Admin)
router.get('/', auth, authorizeRole(['admin']), getAllUsers);

// @route   GET /api/users/:id
// @desc    Get specific user
// @access  Private (Admin or own account)
router.get('/:id', auth, async (req, res, next) => {
  if (req.user.role === 'admin' || req.user.id === req.params.id) {
    next();
  } else {
    return res.status(403).json({ msg: 'Not authorized' });
  }
}, getUserById);

// @route   PUT /api/users/:id
// @desc    Update user (own account or admin only)
// @access  Private (Admin or own account)
router.put(
  '/:id',
  [auth, [
    check('name', 'Name is required').optional(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('password', 'Please enter a password with 6 or more characters').optional().isLength({ min: 6 }),
    check('role', 'Invalid role').optional().isIn(['author', 'admin']),
  ], async (req, res, next) => {
    if (req.user.role === 'admin' || req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json({ msg: 'Not authorized' });
    }
  }],
  updateUser
);

// @route   DELETE /api/users/:id
// @desc    Delete user (admin only)
// @access  Private (Admin)
router.delete('/:id', [auth, authorizeRole(['admin'])], deleteUser);

export default router;