const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

// Connect to MongoDB
mongoose.connect('mongodb+srv://sania:12345@cluster0.tygobp8.mongodb.net/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

// Set up the view engine
app.set('view engine', 'ejs');

//static public folder
app.use(express.static('public'));


// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/', indexRoutes);

// Home page
app.get('/', (req, res) => {
  res.render('home');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
