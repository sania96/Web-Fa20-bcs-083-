const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('home');
});

// Redirect to login page
router.get('/login', (req, res) => {
  res.redirect('/auth/login');
});

// Redirect to signup page
router.get('/signup', (req, res) => {
  res.redirect('/auth/signup');
});

module.exports = router;
