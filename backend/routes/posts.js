const express = require('express');
const { body } = require('express-validator');
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  addComment
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const postValidation = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Post content is required')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Post content must be between 1 and 1000 characters')
];

const commentValidation = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ min: 1, max: 300 })
    .withMessage('Comment must be between 1 and 300 characters')
];

// Routes
router.get('/', protect, getPosts);
router.post('/', protect, postValidation, createPost);
router.get('/:id', protect, getPost);
router.put('/:id', protect, postValidation, updatePost);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentValidation, addComment);

module.exports = router;
