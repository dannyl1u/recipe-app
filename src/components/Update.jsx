// Update.js
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { clearSelectedRecipe, updateRecipe } from "../RecipeReducer";
import { FaEdit } from "react-icons/fa";

const Update = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const recipe = useSelector((state) => state.recipes.selected);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newName, setName] = useState("");
  const [newIngredients, setIngredients] = useState("");
  const [newDirections, setDirections] = useState("");
  const [newDateModified, setNewDateModified] = useState(
    new Date().toLocaleString()
  );

  useEffect(() => {
    if (recipe) {
      setName(recipe.name || "");
      setIngredients(recipe.ingredients || "");
      setDirections(recipe.directions || "");
    } else {
      navigate("/");
    }
  }, [recipe, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setNewDateModified(new Date().toLocaleString());
    dispatch(
      updateRecipe({
        _id: recipe._id,
        name: newName,
        ingredients: newIngredients,
        directions: newDirections,
        dateModified: newDateModified,
      })
    );
    dispatch(clearSelectedRecipe());
    navigate("/");
  };

  if (!recipe) {
    return null;
  }

  return (
    <div className="container mt-5">
      <h3>Update Recipe</h3>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control rounded ${isDarkMode ? "bg-dark text-light" : ""}`}
            onChange={(e) => setName(e.target.value)}
            value={newName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            type="text"
            className={`form-control rounded ${isDarkMode ? "bg-dark text-light" : ""}`}
            onChange={(e) => setIngredients(e.target.value)}
            value={newIngredients}
          />
        </div>
        <div className="form-group">
          <label htmlFor="directions">Directions</label>
          <textarea
            type="text"
            className={`form-control rounded ${isDarkMode ? "bg-dark text-light" : ""}`}
            onChange={(e) => setDirections(e.target.value)}
            value={newDirections}
          />
        </div>
        <br />
        <button className="btn btn-outline-dark m-1">
          <FaEdit /> Update
        </button>
        <button
          className="btn btn-outline-dark m-1"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Update;
