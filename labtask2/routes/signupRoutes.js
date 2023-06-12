// routes/signupRoutes.js
const express = require('express');
const router = express.Router();
const Signup = require('../models/signup');
const cookieParser = require('cookie-parser');

// Render the signup form
router.get('/signup-form', (req, res) => {
  res.render('signup-form', { error: null, message: null });
});

// Render the login form
router.get('/login-form', (req, res) => {
  res.render('login-form', { error: null });
});
// Render the admin page
router.get('/admin', (req, res) => {
  res.render('admin', { error: null });
});

// Handle the signup form submission
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await Signup.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      let error;
      if (existingUser.username === username) {
        error = 'Username already exists';
      } else {
        error = 'Email already exists';
      }
      return res.render('signup-form', { error, message: null });
    }

    const signup = new Signup({ username, email, password });
    await signup.save();
    res.render('landing', { message: 'Successfully signed up' });
  } catch (error) {
    console.error('Error creating signup:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle the login form submission
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Signup.findOne({ username });

    if (!user || user.password !== password) {
      return res.render('login-form', { error: 'Invalid username or password' });
    }

    // Set a cookie to indicate that the user is logged in
    res.cookie('user', user.username, { maxAge: 900000, httpOnly: true });

    // Redirect to the recipe form page
    res.redirect('/index');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
