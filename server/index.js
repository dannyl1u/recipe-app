const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const connectionString = "mongodb://localhost:27017/recipes";

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    const RecipeSchema = new mongoose.Schema({
      name: String,
      ingredients: String,
      directions: String,
      dateModified: String,
    });

    const Recipe = mongoose.model('Recipe', RecipeSchema);

    // Middleware
    app.use(cors());
    app.use(express.json());

    // POST api/recipes - Create a new recipe
    app.post('/api/recipes', async (req, res) => {
      try {
        const newRecipe = new Recipe(req.body);
        const result = await newRecipe.save();
        res.json(result);
      } catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Failed to create recipe' });
      }
    });

    // GET api/recipes - Get all recipes
    app.get('/api/recipes', async (req, res) => {
      try {
        const recipes = await Recipe.find();
        res.json(recipes);
      } catch (error) {
        console.error('Error retrieving recipes:', error);
        res.status(500).json({ error: 'Failed to retrieve recipes' });
      }
    });

    // PUT api/recipes/:id - Update a recipe
    app.put('/api/recipes/:id', async (req, res) => {
      try {
        const updatedRecipe = req.body;
        const result = await Recipe.findByIdAndUpdate(req.params.id, updatedRecipe, { new: true });
        res.json(result);
      } catch (error) {
        console.error('Error updating recipe:', error);
        res.status(500).json({ error: 'Failed to update recipe' });
      }
    });

    // DELETE api/recipes/:id - Delete a recipe
    app.delete('/api/recipes/:id', async (req, res) => {
      try {
        const result = await Recipe.findByIdAndRemove(req.params.id);
        res.json(result);
      } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).json({ error: 'Failed to delete recipe' });
      }
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
