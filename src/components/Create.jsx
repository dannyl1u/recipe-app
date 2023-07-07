import { useEffect, useState } from "react";
import { addRecipe } from "../RecipeReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Create = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [dateModified, setDateModified] = useState(new Date().toLocaleString());

  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setDateModified(new Date().toLocaleString());

    dispatch(
      addRecipe({
        name,
        ingredients,
        directions,
        dateModified,
      })
    );
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h3>Add New Recipe</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={`form-control rounded text-light"}`}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            type="text"
            className={`form-control rounded text-light"}`}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Directions</label>
          <textarea
            type="text"
            className={`form-control rounded text-light"}`}
            onChange={(e) => setDirections(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <button className="btn btn-outline-dark">
            <FaPlus /> Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;