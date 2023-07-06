import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { clearSelectedRecipe, updateRecipe } from "../RecipeReducer";

const Update = () => {
  const recipe = useSelector((state) => state.recipes.selected);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newName, setName] = useState("");
  const [newIngredients, setIngredients] = useState("");
  const [newDirections, setDirections] = useState("");

  useEffect(() => {
    if (recipe) {
      setName(recipe.name || "");
      setIngredients(recipe.ingredients || "");
      setDirections(recipe.directions || "");
    } else {
      navigate('/');
    }
  }, [recipe, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateRecipe({ _id: recipe._id, name: newName, ingredients: newIngredients, directions: newDirections }));
    dispatch(clearSelectedRecipe()); // Clear selected recipe after update.
    navigate('/');
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50'>
            <h3>Update Recipe</h3>
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' 
                    onChange={e => setName(e.target.value)} 
                    value={newName}/>
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients</label>
                    <input type="text" className='form-control'
                    onChange={e => setIngredients(e.target.value)}
                    value={newIngredients} />
                </div>
                <div>
                    <label htmlFor="directions">Directions</label>
                    <input type="text" className='form-control'
                    onChange={e => setDirections(e.target.value)}
                    value={newDirections} />
                </div>
                <br/>
                <button className='btn btn-primary'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default Update
