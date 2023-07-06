const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const uri = "mongodb+srv://kiaanc:kiaanc@recipe.tbzhj84.mongodb.net/recipes?retryWrites=true&w=majority";

// Define Schema
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

// Connect to the MongoDB cluster
const connectDb = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

connectDb();

// POST api/recipes - Create a new recipe
app.post('/api/recipes', async (req, res) => {
  const newRecipe = new Recipe(req.body);
  const result = await newRecipe.save();
  res.json(result);
});

// GET api/recipes - Get all recipes
app.get('/api/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// PUT api/recipes/:id - Update a recipe
app.put('/api/recipes/:id', async (req, res) => {
  const updatedRecipe = req.body;
  const result = await Recipe.findByIdAndUpdate(req.params.id, updatedRecipe, { new: true }); // option {new: true} returns the updated document
  res.json(result);
});

// DELETE api/recipes/:id - Delete a recipe
app.delete('/api/recipes/:id', async (req, res) => {
  const result = await Recipe.findByIdAndRemove(req.params.id);
  res.json(result);
});

// Define port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
