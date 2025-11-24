import express from 'express';
const router = express.Router();

// the routes we will create and import from controllers
// 1. register a new user
router.post('/signup', require('../controllers/auth/signup.controller'));

// 2. login a user
router.post('/signin', require('../controllers/auth/signin.controller'));

module.exports = router;