import { validationResult } from 'express-validator';
import Blog from '../models/Blog.js';
import Category from '../models/Category.js';

// @route   POST /api/blogs
// @desc    Create a new blog
// @access  Private (Authors)
export const createBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, category } = req.body;

  try {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ msg: 'Category not found' });
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      author: req.user.id,
    });

    const blog = await newBlog.save();

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', ['name']).populate('category', ['name']);
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/blogs/:id
// @desc    Get a specific blog by ID
// @access  Public
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', ['name']).populate('category', ['name']);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private (Author of the blog or Admin)
export const updateBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, category } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    const categoryExists = await Category.findById(category);
    if (category && !categoryExists) {
      return res.status(400).json({ msg: 'Category not found' });
    }

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (content) updatedFields.content = content;
    if (category) updatedFields.category = category;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    ).populate('author', ['name']).populate('category', ['name']);

    res.json(updatedBlog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private (Author of the blog or Admin)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    await Blog.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Blog deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   GET /api/blogs/category/:categoryId
// @desc    Get blogs by category
// @access  Public
export const getBlogsByCategory = async (req, res) => {
  try {
    const blogs = await Blog.find({ category: req.params.categoryId })
      .populate('author', ['name'])
      .populate('category', ['name']);

    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.status(500).send('Server error');
  }
};