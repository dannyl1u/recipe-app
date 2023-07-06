import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { updateRecipe } from "../RecipeReducer";

const Update = () => {
    const {id} = useParams();
    console.log(id);
    const recipes = useSelector((state) => state.recipes);
    console.log(recipes);
    const existingRecipes = recipes.filter(f => f._id == id);
    console.log(existingRecipes);
    const {name, ingredients, directions} = existingRecipes[0];

    const [newName, setName] = useState(name);
    const [newIngredients, setIngredients] = useState(ingredients);
    const [newDirections, setDirections] = useState(directions);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateRecipe({id, name: newName, ingredients: newIngredients, directions: newDirections}));
        navigate('/');
    }

  return (
    <div className = 'd-flex w-100 vh-100 justify-content-center align-items-center'>
    <div className = 'w-50'>
        <h3>Update Recipe</h3>
        <form onSubmit={handleUpdate}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" className='form-control' 
                onChange={e => setName(e.target.value)} 
                value={newName}/>
            </div>
            <div>
                <label htmlFor="email">Ingredients</label>
                <input type="text" className='form-control'
                onChange={e => setIngredients(e.target.value)}
                value={newIngredients} />
            </div>
            <div>
                <label htmlFor="email">Directions</label>
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