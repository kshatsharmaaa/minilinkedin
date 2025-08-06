// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY: '/auth/verify'
  },
  USERS: {
    PROFILE: '/users/profile',
    ALL_USERS: '/users'
  },
  POSTS: {
    ALL: '/posts',
    CREATE: '/posts',
    LIKE: (id) => `/posts/${id}/like`,
    COMMENT: (id) => `/posts/${id}/comment`,
    DELETE: (id) => `/posts/${id}`
  }
};

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user'
};

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  BIO_MAX_LENGTH: 500,
  POST_MAX_LENGTH: 1000,
  COMMENT_MAX_LENGTH: 300
};

// UI Constants
export const UI = {
  POSTS_PER_PAGE: 10,
  AVATAR_COLORS: [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
  ]
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTER: 'Registration successful!',
  POST_CREATED: 'Post created successfully!',
  POST_UPDATED: 'Post updated successfully!',
  POST_DELETED: 'Post deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  COMMENT_ADDED: 'Comment added successfully!'
};
