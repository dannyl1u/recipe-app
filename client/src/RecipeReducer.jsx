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

const initialState = {
  list: [],
  selected: null
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState: initialState,
  reducers: {
    setSelectedRecipe: (state, action) => {
      state.selected = action.payload;
    },
    clearSelectedRecipe: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      const { _id } = action.payload;
      const existingRecipeIndex = state.list.findIndex((recipe) => recipe._id === _id);
      if (existingRecipeIndex !== -1) {
        state.list[existingRecipeIndex] = action.payload;
      }
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      const _id = action.payload;
      state.list = state.list.filter((recipe) => recipe._id !== _id);
    });
  },
});

export const { setSelectedRecipe, clearSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
