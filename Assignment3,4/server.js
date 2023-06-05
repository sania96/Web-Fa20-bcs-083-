const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://sania:12345@cluster0.tygobp8.mongodb.net/recipes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
//static folder 
app.use(express.static('public'));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
const recipeRoutes = require('./routes/recipeRoutes');
app.use('/recipes', recipeRoutes);

//model
const Recipe = require('./models/recipe');


// Render index.ejs as the homepage
app.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.render('index', { recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
