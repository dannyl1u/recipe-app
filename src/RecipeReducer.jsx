import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk for fetching recipes from the API
export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes", async () => {
  const response = await axios.get("/api/recipes"); // Replace "/api/recipes" with the actual API endpoint to fetch recipes
  return response.data;
});

// Define the async thunk for creating a recipe
export const addRecipe = createAsyncThunk("recipes/addRecipe", async (recipe) => {
  const response = await axios.post("/api/recipes", recipe); // Replace "/api/recipes" with the actual API endpoint to create a recipe
  return response.data;
});

// Define the async thunk for updating a recipe
export const updateRecipe = createAsyncThunk("recipes/updateRecipe", async (recipe) => {
  const { id, ...updatedRecipe } = recipe;
  const response = await axios.put(`/api/recipes/${id}`, updatedRecipe); // Replace "/api/recipes" with the actual API endpoint to update a recipe
  return response.data;
});

// Define the async thunk for deleting a recipe
export const deleteRecipe = createAsyncThunk("recipes/deleteRecipe", async (id) => {
  await axios.delete(`/api/recipes/${id}`); // Replace "/api/recipes" with the actual API endpoint to delete a recipe
  return id;
});

const recipeSlice = createSlice({
  name: "recipes",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      const { id } = action.payload;
      const existingRecipeIndex = state.findIndex((recipe) => recipe.id === id);
      if (existingRecipeIndex !== -1) {
        state[existingRecipeIndex] = action.payload;
      }
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      const id = action.payload;
      return state.filter((recipe) => recipe.id !== id);
    });
  },
});

export default recipeSlice.reducer;

// Export the async thunks for external usage
// export { fetchRecipes, createRecipe, updateRecipe, deleteRecipe };
