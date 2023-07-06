import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Sample initial data
const recipeList = [];

const recipeSlice = createSlice({
  name: "recipes",
  initialState: recipeList,
  reducers: {
    addRecipe: (state, action) => {
      state.push(action.payload);
    },
    updateRecipe: (state, action) => {
      const { id, name, ingredients, directions } = action.payload;
      const existingRecipe = state.find((recipe) => recipe.id === id);
      if (existingRecipe) {
        existingRecipe.name = name;
        existingRecipe.ingredients = ingredients;
        existingRecipe.directions = directions;
        existingRecipe.dateModified = new Date().toLocaleString();
      }
    },
    deleteRecipe: (state, action) => {
      const { id } = action.payload;
      return state.filter((recipe) => recipe.id !== id);
    },
  },
});

export const { addRecipe, updateRecipe, deleteRecipe } = recipeSlice.actions;

// Action creators with API calls
export const addRecipeAsync = (recipeData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("your-api-url", recipeData);
      dispatch(addRecipe(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateRecipeAsync = (recipeData) => {
  return async (dispatch) => {
    try {
      const { id, name, ingredients, directions } = recipeData;
      await axios.put(`your-api-url/${id}`, { name, ingredients, directions });
      dispatch(updateRecipe(recipeData));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteRecipeAsync = (recipeId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`your-api-url/${recipeId}`);
      dispatch(deleteRecipe({ id: recipeId }));
    } catch (error) {
      console.error(error);
    }
  };
};

export default recipeSlice.reducer;
