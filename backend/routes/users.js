const express = require('express');
const { body } = require('express-validator');
const { getUserProfile, updateProfile, getAllUsers } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters')
];

// Routes
router.get('/profile/:id', getUserProfile);
router.put('/profile', protect, updateProfileValidation, updateProfile);
router.get('/', protect, getAllUsers);

module.exports = router;
