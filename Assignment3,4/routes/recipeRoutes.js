const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// New recipe form route
router.get('/new', (req, res) => {
  res.render('recipe-form', { recipe: null });
});

// Edit recipe form route
router.get('/:id/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipe-form', { recipe });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create a new recipe
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const recipe = new Recipe({ title, description });
    await recipe.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a recipe
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    await Recipe.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect('/');
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndRemove(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
