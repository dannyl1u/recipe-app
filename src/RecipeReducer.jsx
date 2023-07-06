import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the async thunk for fetching recipes from the API
export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes", async () => {
  const response = await axios.get("http://localhost:5000/api/recipes/"); // Replace "/api/recipes" with the actual API endpoint to fetch recipes
  return response.data;
});

export const addRecipe = createAsyncThunk("recipes/createRecipe", async (recipe) => {
  const response = await axios.post("http://localhost:5000/api/recipes/", recipe);
  return response.data; 
});

export const updateRecipe = createAsyncThunk("recipes/updateRecipe", async (recipe) => {
  const { _id, ...updatedRecipe } = recipe;
  const response = await axios.put(`http://localhost:5000/api/recipes/${_id}`, updatedRecipe);
  return response.data; 
});

export const deleteRecipe = createAsyncThunk("recipes/deleteRecipe", async (_id) => {
  const response = await axios.delete(`http://localhost:5000/api/recipes/${_id}`);
  return response.data;
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
      const { _id } = action.payload;
      const existingRecipeIndex = state.findIndex((recipe) => recipe._id === _id);
      if (existingRecipeIndex !== -1) {
        state[existingRecipeIndex] = action.payload;
      }
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      const _id = action.payload;
      return state.filter((recipe) => recipe._id !== _id);
    });
  },
});

export default recipeSlice.reducer;