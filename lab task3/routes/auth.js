const express = require('express');
const router = express.Router();
const User = require('../models/user');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

// Handle user login (GET and POST requests)
router.route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        res.send('User does not exist');
        return;
      }

      if (user.password === password) {
        res.send('Successfully logged in!');
      } else {
        res.send('Invalid password');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

// Handle user signup (GET and POST requests)
router.route('/signup')
  .get((req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    const { username, password } = req.body;

    try {
      const existingUser = await User.findOne({ username: username });

      if (existingUser) {
        res.send('Username already exists');
        return;
      }

      await User.create({ username, password });
      res.redirect('/auth/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
